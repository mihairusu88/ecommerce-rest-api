/**
 * Kafka producer for the order service — the *producer* half of the platform's
 * first event-driven flow:
 *
 *   order-service  --( OrderPlaced )-->  [ "orders" topic ]  -->  product-service
 *
 * When an order is created, we append an immutable `OrderPlaced` fact to the
 * `orders` topic and move on. We do NOT know or care who consumes it — the
 * product service decrements inventory today; tomorrow a notification or
 * analytics service can subscribe to the same topic without any change here.
 * That is the whole point of the log: producers are decoupled from consumers.
 *
 * Kafka is OPTIONAL. If `KAFKA_BROKERS` is unset (the default for `npm run dev`,
 * which has no broker), publishing is a no-op and the service behaves exactly as
 * the file-based mock always has. Set `KAFKA_BROKERS` (see docker-compose.yml)
 * to turn the real flow on.
 */
import { Kafka, logLevel } from "kafkajs";

const BROKERS = (process.env.KAFKA_BROKERS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || "order-service";

export const ORDERS_TOPIC = process.env.KAFKA_ORDERS_TOPIC || "orders";
export const kafkaEnabled = BROKERS.length > 0;

let producer = null;

/**
 * Connect the producer at startup. Failures are logged but never fatal — a
 * missing/unreachable broker just leaves the service in mock mode.
 */
export async function initProducer() {
  if (!kafkaEnabled) {
    console.log("[order-service] KAFKA_BROKERS not set — OrderPlaced publishing disabled (mock mode).");
    return;
  }
  try {
    const kafka = new Kafka({ clientId: CLIENT_ID, brokers: BROKERS, logLevel: logLevel.NOTHING });
    const producerInstance = kafka.producer();
    await producerInstance.connect();
    producer = producerInstance;
    console.log(`[order-service] Kafka producer connected to ${BROKERS.join(", ")} (topic: ${ORDERS_TOPIC})`);
  } catch (err) {
    console.warn(`[order-service] Kafka producer failed to connect (${err.message}) — publishing disabled.`);
  }
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

/**
 * Publish an `OrderPlaced` event for the given order. Keyed by order id so all
 * events for one order land in the same partition (preserving their order).
 * Returns true if published, false if Kafka is off/unavailable. Never throws:
 * the order is already persisted, so a publish failure must not fail the request
 * (it is logged for visibility).
 */
export async function publishOrderPlaced(order) {
  if (!producer) return false;

  const event = {
    type: "OrderPlaced",
    orderId: order.id,
    userId: order.userId,
    products: order.products.map((p) => ({ id: p.id, quantity: p.quantity })),
    total: order.total,
    discountedTotal: order.discountedTotal,
    at: new Date().toISOString(),
  };

  try {
    await producer.send({
      topic: ORDERS_TOPIC,
      messages: [{ key: String(order.id), value: JSON.stringify(event) }],
    });
    console.log(`[order-service] published OrderPlaced for order ${order.id}`);
    return true;
  } catch (err) {
    console.warn(`[order-service] failed to publish OrderPlaced for order ${order.id}: ${err.message}`);
    return false;
  }
}
