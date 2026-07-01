import { randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// Refresh tokens are signed with a distinct secret and live much longer than
// access tokens, so a leaked access token can't be replayed to mint new ones.
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || `${JWT_SECRET}-refresh`;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

/** Sign a short-lived access token for the given payload (e.g. { sub, username }). */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/** Verify an access token and return its decoded payload; throws if invalid or expired. */
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

/**
 * Sign a long-lived refresh token. Tagged `type: "refresh"` to prevent cross-use,
 * and given a unique `jti` so two tokens minted in the same second (identical
 * payload + `iat`) don't collide — that would break rotation in the token store.
 */
export function signRefreshToken(payload) {
  return jwt.sign({ ...payload, type: "refresh", jti: randomUUID() }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

/** Verify a refresh token and return its decoded payload; throws if invalid or expired. */
export function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, JWT_REFRESH_SECRET);
  if (decoded.type !== "refresh") {
    throw new Error("Not a refresh token");
  }
  return decoded;
}
