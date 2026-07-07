import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import { authenticate } from "../middleware/authenticate.js";
import { signToken, signRefreshToken, verifyRefreshToken } from "../utils/jwt.js";
import { findUserByUsername, findUserById, verifyPassword, toPublicUser } from "../utils/users.js";
import { setAuthCookies, getRefreshCookie } from "../utils/cookies.js";
import {
  addRefreshToken,
  isRefreshTokenActive,
  rotateRefreshToken,
} from "../utils/refreshStore.js";
import { publishUserLoggedIn, publishUserDetailed } from "../utils/kafka.js";

const router = Router();
const SERVICE_NAME = packageJson.name;

/** Mint a fresh access + refresh token pair for a user. */
function issueTokens(user) {
  const accessToken = signToken({ sub: user.id, username: user.username });
  const refreshToken = signRefreshToken({ sub: user.id, username: user.username });
  return { accessToken, refreshToken };
}

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is up and running
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: SERVICE_NAME,
    uptime: process.uptime(),
  });
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful — returns the user profile plus access &
 *           refresh tokens (also set as HTTP cookies).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Bad request (missing username or password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username and password are required",
      statusCode: 400,
    });
  }

  const user = findUserByUsername(username);
  if (!user || !(await verifyPassword(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  const { accessToken, refreshToken } = issueTokens(user);
  addRefreshToken(refreshToken);
  setAuthCookies(res, { accessToken, refreshToken });

  await publishUserLoggedIn(user.id);
  res.status(200).json({
    ...toPublicUser(user),
    accessToken,
    refreshToken,
    access_token: accessToken,
    token_type: "bearer",
  });
});

/**
 * @openapi
 * /api/me:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     security:
 *       - passwordAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserInformationResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/me", authenticate, async (req, res) => {
  // req.user is the decoded token payload, set by the authenticate middleware.
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "User no longer exists",
      statusCode: 401,
    });
  }

  await publishUserDetailed(user.id, toPublicUser(user));
  res.status(200).json({
    status: "success",
    message: "User information retrieved successfully",
    user: toPublicUser(user),
  });
});

/**
 * @openapi
 * /api/refresh:
 *   post:
 *     summary: Refresh access token
 *     description: Validates the supplied refresh token (from the request body or
 *       the `refreshToken` cookie), rotates it, and returns a new access & refresh
 *       token pair (also set as HTTP cookies).
 *     tags: [Auth]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshTokenResponse'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/refresh", (req, res) => {
  const providedToken = req.body?.refreshToken || getRefreshCookie(req);

  if (!providedToken) {
    return res.status(401).json({
      status: "error",
      message: "Refresh token is required",
      statusCode: 401,
    });
  }

  // Must be both cryptographically valid AND still active (not already rotated).
  let payload;
  try {
    payload = verifyRefreshToken(providedToken);
  } catch {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired refresh token",
      statusCode: 401,
    });
  }

  if (!isRefreshTokenActive(providedToken)) {
    return res.status(401).json({
      status: "error",
      message: "Refresh token has been revoked",
      statusCode: 401,
    });
  }

  const user = findUserById(payload.sub);
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "User no longer exists",
      statusCode: 401,
    });
  }

  // Rotate: retire the presented token and issue a fresh pair.
  const { accessToken, refreshToken } = issueTokens(user);
  rotateRefreshToken(providedToken, refreshToken);
  setAuthCookies(res, { accessToken, refreshToken });

  res.status(200).json({
    accessToken,
    refreshToken,
  });
});

export default router;
