/**
 * In-memory allow-list of currently-valid refresh tokens.
 *
 * JWTs are stateless, so on their own they can't be invalidated before expiry.
 * To support rotation ("issue a new refresh token, retire the old one"), we
 * track the set of live refresh tokens here: a token is only accepted at
 * /refresh if it is both cryptographically valid AND still in this set.
 *
 * This mirrors the file-based mock-database approach — it lives in process
 * memory and resets on restart, which is fine for development, demos and tests.
 * A production system would back this with a shared store (e.g. Redis).
 */
const activeRefreshTokens = new Set();

export function addRefreshToken(token) {
  activeRefreshTokens.add(token);
}

export function isRefreshTokenActive(token) {
  return activeRefreshTokens.has(token);
}

export function removeRefreshToken(token) {
  activeRefreshTokens.delete(token);
}

/** Retire `oldToken` and register `newToken` in one step (token rotation). */
export function rotateRefreshToken(oldToken, newToken) {
  activeRefreshTokens.delete(oldToken);
  activeRefreshTokens.add(newToken);
}
