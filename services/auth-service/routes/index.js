import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import { authenticate } from "../middleware/authenticate.js";
import { signToken } from "../config/jwt.js";
import { findUserByUsername, verifyPassword, toPublicUser } from "../config/users.js";

const router = Router();
const SERVICE_NAME = packageJson.name;

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
 *         description: Login successful
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

  // Mock lookup for now — replaced by a DB query once persistence lands.
  const user = findUserByUsername(username);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return res.status(401).json({
      status: "error",
      message: "Invalid credentials",
      statusCode: 401,
    });
  }

  const token = signToken({ sub: user.id, username: user.username });
  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
    // OAuth2 token-response fields — let Swagger UI's password flow consume
    // this same endpoint and apply the JWT as a Bearer token automatically.
    access_token: token,
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
router.get("/me", authenticate, (req, res) => {
  // req.user is the decoded token payload, set by the authenticate middleware.
  const user = findUserByUsername(req.user.username);
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "User no longer exists",
      statusCode: 401,
    });
  }

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
 *     tags: [Auth]
 *     security:
 *       - passwordAuth: []
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
router.post("/refresh", authenticate, (req, res) => {
  // The caller proved possession of a still-valid token; issue a fresh one.
  const token = signToken({ sub: req.user.sub, username: req.user.username });
  res.status(200).json({
    status: "success",
    message: "Token refreshed successfully",
    token,
  });
});

export default router;
