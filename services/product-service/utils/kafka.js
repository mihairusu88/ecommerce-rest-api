/**
 * Kafka consumer for the product service — the *consumer* half of the platform's
 * first event-driven flow:
 *
 *   order-service  --( OrderPlaced )-->  [ "orders" topic ]  -->  product-service
 *
 * The order service knows nothing about inventory; it just records that an order
 * happened. This service subscribes to that stream and reacts by decrementing
 * stock. Because Kafka retains the log and each consumer tracks its own offset,
 * this service can be down for a while and still catch up on every OrderPlaced
 * event when it comes back — no orders are lost.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), the consumer simply never starts and the catalogue
 * behaves as the read-only mock always has. Set `KAFKA_BROKERS` (see
 * docker-compose.yml) to turn the real flow on.
 */
import { Kafka, logLevel } from "kafkajs";
import { reduceStock } from "./inventory.js";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "product-service";
// A stable group id lets Kafka remember this consumer's committed offset across
// restarts, so it resumes where it left off instead of reprocessing everything.
const GROUP_ID = process.env.KAFKA_GROUP_ID || "product-service-inventory";

export const ORDERS_TOPIC = process.env.KAFKA_ORDERS_TOPIC || "orders";
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
    await admin.createTopics({ topics: [{ topic: ORDERS_TOPIC, numPartitions: 1 }] });
  } finally {
    await admin.disconnect();
  }
}

/** Apply a single decoded event. Only `OrderPlaced` affects inventory. */
function handleEvent(event) {
  const isOrderPlacedEvent = event?.type === "OrderPlaced";

  if (!isOrderPlacedEvent) return;
  
  const changes = reduceStock(event.products || []);
  const summary = changes
    .map((c) => (c.applied === false ? `${c.id}:skipped` : `${c.id}:${c.before}→${c.after}`))
    .join(", ");
  console.log(`[product-service] OrderPlaced order=${event.orderId} inventory[${summary}]`);
}

/**
 * Connect and start the consumer. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves inventory static (mock mode).
 * `fromBeginning: true` so a fresh group replays the retained log.
 */
export async function startOrderConsumer() {
  if (!kafkaEnabled) {
    console.log("[product-service] KAFKA_BROKERS not set — OrderPlaced consumer disabled (mock mode).");
    return;
  }
  try {
    const kafka = new Kafka({ clientId: CLIENT_ID, brokers: BROKERS, logLevel: logLevel.NOTHING });
    await ensureTopic(kafka);
    const consumerInstance = kafka.consumer({ groupId: GROUP_ID });
    await consumerInstance.connect();
    await consumerInstance.subscribe({ topic: ORDERS_TOPIC, fromBeginning: true });
    await consumerInstance.run({
      eachMessage: async ({ message }) => {
        try {
          handleEvent(JSON.parse(message.value.toString()));
        } catch (err) {
          console.warn(`[product-service] skipped malformed message: ${err.message}`);
        }
      },
    });
    consumer = consumerInstance;
    console.log(`[product-service] Kafka consumer subscribed to "${ORDERS_TOPIC}" (group: ${GROUP_ID})`);
  } catch (err) {
    console.warn(`[product-service] Kafka consumer failed to start (${err.message}) — inventory updates disabled.`);
  }
}

/** Cleanly disconnect on shutdown so the group rebalances promptly. */
export async function stopOrderConsumer() {
  if (!consumer) return;
  try {
    await consumer.disconnect();
  } finally {
    consumer = null;
  }
}
