import bcrypt from "bcryptjs";
import users from "../../../database/users.js";

/**
 * User access helpers. The raw user records now live in the shared file-based
 * mock database (`database/users.js`); this module layers lookup + password
 * helpers on top so route code stays unchanged if the store is swapped later.
 *
 * Each record's `password` field is a bcrypt hash (never plaintext), exactly as
 * it would be stored in a real database.
 */
export function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}

/** Strip the password hash before returning a user over the wire. */
export function toPublicUser({ id, username, email, firstName, lastName, gender, image }) {
  return { id, username, email, firstName, lastName, gender, image };
}
