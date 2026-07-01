import { Router } from "express";
import packageJson from "../package.json" with { type: "json" };
import products from "../../../database/products.js";
import {
  getCategories,
  searchProducts,
  sortProducts,
  paginate,
} from "../utils/products.js";

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
 * /api/products:
 *   get:
 *     summary: List products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of products to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of products to skip (for pagination).
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category (e.g. beauty, electronics, fashion).
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Product field to sort by (e.g. title, price, rating).
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort direction; only applies when sortBy is set.
 *     responses:
 *       200:
 *         description: A paginated list of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products", (req, res) => {
  const { category, sortBy, order } = req.query;
  let list = category ? products.filter((p) => p.category === category) : products;
  list = sortProducts(list, sortBy, order);

  res.status(200).json(paginate(list, req.query));
});

/**
 * @openapi
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search term matched against title, description, brand, category and tags.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Product field to sort results by (e.g. title, price, rating).
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort direction; only applies when sortBy is set.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 30
 *         description: Max number of results to return (0 returns all).
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         description: Number of results to skip (for pagination).
 *     responses:
 *       200:
 *         description: A paginated list of matching products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/search", (req, res) => {
  const { query, q, sortBy, order } = req.query;
  let list = searchProducts(query ?? q ?? "");
  list = sortProducts(list, sortBy, order);

  res.status(200).json(paginate(list, req.query));
});

/**
 * @openapi
 * /api/products/categories:
 *   get:
 *     summary: List product categories
 *     description: >
 *       Returns the array of available categories. To list the products in a
 *       category, use `GET /api/products?category=<slug>`.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/categories", (req, res) => {
  // Honour reverse-proxy headers so links are correct behind the gateway.
  const proto = req.get("x-forwarded-proto") || req.protocol;
  const host = req.get("x-forwarded-host") || req.get("host");
  res.status(200).json(getCategories(`${proto}://${host}`));
});

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product id.
 *     responses:
 *       200:
 *         description: The requested product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/products/:id", (req, res) => {
  const id = Number.parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: `Product with id ${req.params.id} not found`,
      statusCode: 404,
    });
  }

  res.status(200).json(product);
});

export default router;
