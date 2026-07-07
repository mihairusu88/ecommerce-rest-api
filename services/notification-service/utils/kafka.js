/**
 * Kafka consumer for the notification service — one of two independent consumers
 * of the user-lifecycle stream:
 *
 *   auth-service --( UserLoggedIn / UserDetailed )--> [ "user-events" topic ]
 *                                                          |        |
 *                                          notification-service   analytics-service
 *
 * This service reacts to those facts by (in a real system) sending a message —
 * a welcome/login alert, a profile-change confirmation, etc. It subscribes on
 * its OWN consumer group, so it receives every event independently of the
 * analytics service; neither depends on the other.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), the consumer simply never starts and the service behaves
 * as the read-only mock always has. Set `KAFKA_BROKERS` (see docker-compose.yml)
 * to turn the real flow on.
 */
import { Kafka, logLevel } from "kafkajs";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "notification-service";
// A stable group id lets Kafka remember this consumer's committed offset across
// restarts, so it resumes where it left off instead of reprocessing everything.
const GROUP_ID = process.env.KAFKA_GROUP_ID || "notification-service-group";

export const USER_EVENTS_TOPIC = process.env.KAFKA_USER_EVENTS_TOPIC || "user-events";
export const kafkaEnabled = BROKERS.length > 0;

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

/** React to a single decoded event. Only user-lifecycle events are of interest. */
function handleEvent(event) {
  const isUserEvent = event?.type === "UserLoggedIn" || event?.type === "UserDetailed";
  if (!isUserEvent) return;

  // In a real system this is where an email/SMS/push would be dispatched.
  console.log(`[notification-service] would notify user=${event.userId} for ${event.type}`);
}

/**
 * Connect and start the consumer. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves the service idle (mock mode).
 * `fromBeginning: true` so a fresh group replays the retained log.
 */
export async function startUserNotificationConsumer() {
  if (!kafkaEnabled) {
    console.log("[notification-service] KAFKA_BROKERS not set — user-event consumer disabled (mock mode).");
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
          console.warn(`[notification-service] skipped malformed message: ${err.message}`);
        }
      },
    });
    consumer = consumerInstance;
    console.log(`[notification-service] Kafka consumer subscribed to "${USER_EVENTS_TOPIC}" (group: ${GROUP_ID})`);
  } catch (err) {
    console.warn(`[notification-service] Kafka consumer failed to start (${err.message}) — notifications disabled.`);
  }
}

/** Cleanly disconnect on shutdown so the group rebalances promptly. */
export async function stopUserNotificationConsumer() {
  if (!consumer) return;
  try {
    await consumer.disconnect();
  } finally {
    consumer = null;
  }
}
