/**
 * Kafka consumer for the payment service — a second, independent consumer of the
 * order stream (the product service is the other):
 *
 *   order-service --( OrderPlaced )--> [ "orders" topic ]
 *                                          |          |
 *                                 product-service   payment-service
 *                                 (adjust stock)    (open a pending payment)
 *
 * When an order is placed, this service opens a `pending` payment for it — the
 * first step of a checkout saga. It subscribes on its OWN consumer group, so it
 * receives every OrderPlaced event independently of the product service.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), the consumer never starts and payments are only created
 * via `POST /api/payments`. Set `KAFKA_BROKERS` (see docker-compose.yml) to turn
 * the flow on.
 */
import { Kafka, logLevel } from "kafkajs";
import { createPendingPaymentFromOrder } from "./payments.js";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "payment-service";
// A stable group id lets Kafka remember this consumer's committed offset across
// restarts, so it resumes where it left off instead of reprocessing everything.
const GROUP_ID = process.env.KAFKA_GROUP_ID || "payment-service-group";

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

/** Open a pending payment for a single decoded event. Only `OrderPlaced` applies. */
function handleEvent(event) {
  if (event?.type !== "OrderPlaced") return;

  const payment = createPendingPaymentFromOrder(event);
  if (payment) {
    console.log(`[payment-service] OrderPlaced order=${event.orderId} -> payment #${payment.id} ${payment.status} $${payment.amount}`);
  } else {
    console.warn(`[payment-service] OrderPlaced order=${event.orderId} skipped — insufficient data to bill`);
  }
}

/**
 * Connect and start the consumer. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves payments API-only (mock mode).
 * `fromBeginning: true` so a fresh group replays the retained log.
 */
export async function startOrderConsumer() {
  if (!kafkaEnabled) {
    console.log("[payment-service] KAFKA_BROKERS not set — OrderPlaced consumer disabled (mock mode).");
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
          console.warn(`[payment-service] skipped malformed message: ${err.message}`);
        }
      },
    });
    consumer = consumerInstance;
    console.log(`[payment-service] Kafka consumer subscribed to "${ORDERS_TOPIC}" (group: ${GROUP_ID})`);
  } catch (err) {
    console.warn(`[payment-service] Kafka consumer failed to start (${err.message}) — payment automation disabled.`);
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
