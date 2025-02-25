import express, { Request, Response } from 'express';
import cartItemController from '../controllers/cartItemController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /cartItems:
 *   post:
 *     summary: Create a new cart item
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new cart item in the system (requires authentication).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *                 description: The ID of the cart.
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product in the cart.
 *     responses:
 *       201:
 *         description: Cart item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  cartItemController.createCartItem(req, res);
});

/**
 * @swagger
 * /cartItems/{id}:
 *   get:
 *     summary: Get a cart item by ID
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific cart item from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart item.
 *     responses:
 *       200:
 *         description: The requested cart item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  cartItemController.getCartItemById(req, res);
});

/**
 * @swagger
 * /cartItems:
 *   get:
 *     summary: Get all cart items
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all cart items in the system (requires authentication).
 *     responses:
 *       200:
 *         description: A list of cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  cartItemController.getAllCartItems(req, res);
});

/**
 * @swagger
 * /cartItems/{id}:
 *   patch:
 *     summary: Update an existing cart item
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     description: Update specific fields of an existing cart item in the system (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart item.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_id:
 *                 type: string
 *                 description: The new ID of the cart.
 *               product_id:
 *                 type: string
 *                 description: The new ID of the product.
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product in the cart.
 *     responses:
 *       200:
 *         description: The updated cart item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Cart item not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  cartItemController.updateCartItem(req, res);
});

/**
 * @swagger
 * /cartItems/{id}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     tags: [CartItems]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific cart item from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the cart item.
 *     responses:
 *       200:
 *         description: Cart item deleted successfully.
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
 *         description: Cart item not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  cartItemController.deleteCartItem(req, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The cart item ID (MongoDB ObjectId)
 *         cart_id:
 *           type: string
 *           description: The ID of the cart
 *         product_id:
 *           type: string
 *           description: The ID of the product
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the cart
 *         addedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the item was added to the cart
 *   securitySchemes:
 *     bearerAuth:            # can be any name
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router;