import bcrypt from "bcryptjs";

/**
 * Mock user store. This stands in for a MongoDB-backed lookup until persistence
 * lands — swap the array + helpers for model queries then; the callers below
 * (login / me) won't need to change.
 *
 * Passwords are never held in plaintext: the seed password is hashed with
 * bcrypt at startup, exactly as it will be stored in the database.
 */
const SALT_ROUNDS = 10;

const users = [
  {
    id: 1,
    username: "guest",
    email: "guest@example.com",
    passwordHash: bcrypt.hashSync("guest12345", SALT_ROUNDS),
  },
];

export function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

export function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

/** Strip the password hash before returning a user over the wire. */
export function toPublicUser({ id, username, email }) {
  return { id, username, email };
}
