import { verifyToken } from "../utils/jwt.js";

/**
 * Require a valid `Authorization: Bearer <token>` header. On success the decoded
 * token payload is attached to `req.user` and the request continues; otherwise
 * the request is rejected with a 401 in the standard ErrorResponse shape.
 */
export function authenticate(req, res, next) {
  const [scheme, token] = (req.headers.authorization || "").split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      status: "error",
      message: "Missing or malformed Authorization header (expected 'Bearer <token>')",
      statusCode: 401,
    });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({
      status: "error",
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }
}
