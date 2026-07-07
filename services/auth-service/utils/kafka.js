/**
 * Kafka producer for the auth service — the *producer* of user-lifecycle facts:
 *
 *   auth-service --( UserLoggedIn / UserDetailed )--> [ "user-events" topic ]
 *                                                          |        |
 *                                          notification-service   analytics-service
 *
 * auth owns login (`POST /api/login`) and the profile lookup (`GET /api/me`), so
 * it is the single publisher of these facts. It does NOT know or care who
 * consumes them — notification-service and analytics-service each subscribe to
 * the same topic independently (fan-out). That is the whole point of the log:
 * add a new consumer without touching this code.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), publishing is a no-op and auth behaves exactly as the
 * file-based mock always has. Set `KAFKA_BROKERS` (see docker-compose.yml) to
 * turn the real flow on.
 */
import { Kafka, logLevel } from "kafkajs";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "auth-service";

export const USER_EVENTS_TOPIC = process.env.KAFKA_USER_EVENTS_TOPIC || "user-events";
export const kafkaEnabled = BROKERS.length > 0;

let producer = null;

/**
 * Connect the producer at startup. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves the service in mock mode.
 */
export async function initProducer() {
  if (!kafkaEnabled) {
    console.log("[auth-service] KAFKA_BROKERS not set — user-event publishing disabled (mock mode).");
    return;
  }
  try {
    const kafka = new Kafka({ clientId: CLIENT_ID, brokers: BROKERS, logLevel: logLevel.NOTHING });
    const producerInstance = kafka.producer();
    await producerInstance.connect();
    producer = producerInstance;
    console.log(`[auth-service] Kafka producer connected to ${BROKERS.join(", ")} (topic: ${USER_EVENTS_TOPIC})`);
  } catch (err) {
    console.warn(`[auth-service] Kafka producer failed to connect (${err.message}) — publishing disabled.`);
  }
}

/**
 * Publish a user-lifecycle event, keyed by userId so all events for one user
 * land in the same partition (preserving their order). Returns true if
 * published, false if Kafka is off/unavailable. Never throws: the HTTP response
 * (login / profile) must not fail just because an event couldn't ship.
 */
async function publish(event) {
  if (!producer) return false;
  try {
    await producer.send({
      topic: USER_EVENTS_TOPIC,
      messages: [{ key: String(event.userId), value: JSON.stringify(event) }],
    });
    console.log(`[auth-service] published ${event.type} for user ${event.userId}`);
    return true;
  } catch (err) {
    console.warn(`[auth-service] failed to publish ${event.type} for user ${event.userId}: ${err.message}`);
    return false;
  }
}

/** Fact: a user authenticated successfully. */
export function publishUserLoggedIn(userId) {
  return publish({ type: "UserLoggedIn", userId, at: new Date().toISOString() });
}

/** Fact: a user's profile/details were retrieved (GET /api/me). */
export function publishUserDetailed(userId, details) {
  return publish({ type: "UserDetailed", userId, details, at: new Date().toISOString() });
}

/** Cleanly disconnect on shutdown so the broker doesn't wait on a dead client. */
export async function disconnectProducer() {
  if (!producer) return;
  try {
    await producer.disconnect();
  } finally {
    producer = null;
  }
}
