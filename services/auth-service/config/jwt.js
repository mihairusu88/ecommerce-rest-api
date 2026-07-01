import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

/** Sign a short-lived access token for the given payload (e.g. { sub, username }). */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/** Verify a token and return its decoded payload; throws if invalid or expired. */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
