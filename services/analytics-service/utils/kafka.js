/**
 * Kafka consumer for the analytics service — the second, independent consumer of
 * the user-lifecycle stream:
 *
 *   auth-service --( UserLoggedIn / UserDetailed )--> [ "user-events" topic ]
 *                                                          |        |
 *                                          notification-service   analytics-service
 *
 * analytics subscribes on its OWN consumer group, so it sees every user event
 * regardless of what the notification service does — that is why auth publishes
 * once and each interested service consumes independently (fan-out), rather than
 * one service relaying to another. Each consumed fact is turned into an
 * analytics event (`user_login` / `user_details_viewed`) and appended to the
 * event log that `GET /api/analytics/summary` aggregates.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), the consumer never starts and analytics just serves the
 * seeded event log. Set `KAFKA_BROKERS` (see docker-compose.yml) to turn it on.
 */
import { Kafka, logLevel } from "kafkajs";
import { recordEvent } from "./analytics.js";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "analytics-service";
// A stable group id lets Kafka remember this consumer's committed offset across
// restarts, so it resumes where it left off instead of reprocessing everything.
const GROUP_ID = process.env.KAFKA_GROUP_ID || "analytics-service-group";

export const USER_EVENTS_TOPIC = process.env.KAFKA_USER_EVENTS_TOPIC || "user-events";
export const kafkaEnabled = BROKERS.length > 0;

// Map an incoming user-event type to the analytics event type we record. Only
// these are of interest; anything else on the topic is ignored.
const EVENT_TYPE_MAP = {
  UserLoggedIn: "user_login",
  UserDetailed: "user_details_viewed",
};

let consumer = null;

/**
 * Ensure the topic exists before we subscribe. Broker auto-creation is racy — a
 * consumer that subscribes `fromBeginning` to a not-yet-created topic can fail
 * with "This server does not host this topic-partition". Creating it up front
 * (idempotent: a no-op if it already exists) makes startup deterministic
 * regardless of whether the producer has run yet.
 */
async function ensureTopic(kafka) {
  const admin = kafka.admin();
  try {
    await admin.connect();
    await admin.createTopics({ topics: [{ topic: USER_EVENTS_TOPIC, numPartitions: 1 }] });
  } finally {
    await admin.disconnect();
  }
}

/**
 * Turn a single decoded user event into a recorded analytics event. We keep only
 * the type/user/timestamp — deliberately NOT the profile PII the event may carry
 * (that is the notification service's concern, not analytics').
 */
function handleEvent(event) {
  const analyticsType = EVENT_TYPE_MAP[event?.type];
  if (!analyticsType) return;

  const recorded = recordEvent({ type: analyticsType, userId: event.userId, at: event.at });
  console.log(`[analytics-service] recorded ${analyticsType} for user=${event.userId} (event #${recorded.id})`);
}

/**
 * Connect and start the consumer. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves analytics on the seeded log (mock mode).
 * `fromBeginning: true` so a fresh group replays the retained log.
 */
export async function startUserEventConsumer() {
  if (!kafkaEnabled) {
    console.log("[analytics-service] KAFKA_BROKERS not set — user-event consumer disabled (mock mode).");
    return;
  }
  try {
    const kafka = new Kafka({ clientId: CLIENT_ID, brokers: BROKERS, logLevel: logLevel.NOTHING });
    await ensureTopic(kafka);
    const consumerInstance = kafka.consumer({ groupId: GROUP_ID });
    await consumerInstance.connect();
    await consumerInstance.subscribe({ topic: USER_EVENTS_TOPIC, fromBeginning: true });
    await consumerInstance.run({
      eachMessage: async ({ message }) => {
        try {
          handleEvent(JSON.parse(message.value.toString()));
        } catch (err) {
          console.warn(`[analytics-service] skipped malformed message: ${err.message}`);
        }
      },
    });
    consumer = consumerInstance;
    console.log(`[analytics-service] Kafka consumer subscribed to "${USER_EVENTS_TOPIC}" (group: ${GROUP_ID})`);
  } catch (err) {
    console.warn(`[analytics-service] Kafka consumer failed to start (${err.message}) — analytics ingestion disabled.`);
  }
}

/** Cleanly disconnect on shutdown so the group rebalances promptly. */
export async function stopUserEventConsumer() {
  if (!consumer) return;
  try {
    await consumer.disconnect();
  } finally {
    consumer = null;
  }
}
