import express, { Request, Response } from 'express';
import cartController from '../controllers/cartController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new cart for a user (requires authentication).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user.
 *     responses:
 *       201:
 *         description: Cart created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  cartController.createCart(req, res);
});

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Get a cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific cart from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart.
 *     responses:
 *       200:
 *         description: The requested cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  cartController.getCartById(req, res);
});

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all carts in the system (requires authentication).
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  cartController.getAllCarts(req, res);
});

/**
 * @swagger
 * /carts/{id}:
 *   patch:
 *     summary: Update an existing cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     description: Update specific fields of an existing cart in the system (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The new ID of the user.
 *     responses:
 *       200:
 *         description: The updated cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  cartController.updateCart(req, res);
});

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific cart from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart.
 *     responses:
 *       200:
 *         description: Cart deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A confirmation message.
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Cart not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  cartController.deleteCart(req, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The cart ID (MongoDB ObjectId)
 *         user_id:
 *           type: string
 *           description: The ID of the user
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the cart was created
 *   securitySchemes:
 *     bearerAuth:            # can be any name
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router;