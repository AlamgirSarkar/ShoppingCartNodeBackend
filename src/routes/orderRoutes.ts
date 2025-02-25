import express, { Request, Response } from 'express';
import orderController from '../controllers/orderController';
import orderItemController from '../controllers/orderItemController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *               total_price:
 *                 type: number
 *                 format: float
 *                 description: The total price of the order.
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, delivered, cancelled]
 *                 description: The order status (optional, defaults to 'pending').
 *     responses:
 *       201:
 *         description: The newly created order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  orderController.createOrder(req, res);
});

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: The requested order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  orderController.getOrderById(req, res);
});

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of orders to retrieve.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The starting index for retrieving orders.
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  orderController.getAllOrders(req, res);
});

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: The new ID of the user placing the order.
 *               total_price:
 *                 type: number
 *                 format: float
 *                 description: The new total price of the order.
 *               status:
 *                 type: string
 *                 enum: [pending, paid, shipped, delivered, cancelled]
 *                 description: The new order status.
 *     responses:
 *       200:
 *         description: The updated order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error.
 *       404:
 *         description: Order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  orderController.updateOrder(req, res);
});

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to delete.
 *     responses:
 *       200:
 *         description: Order deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the order deletion.
 *       404:
 *         description: Order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  orderController.deleteOrder(req, res);
});

/**
 * @swagger
 * /orders/{orderId}/items:
 *   post:
 *     summary: Create a new order item
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to add the item to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product being ordered.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product being ordered.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the product being ordered.
 *     responses:
 *       201:
 *         description: The newly created order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.post('/:orderId/items', authenticate, (req: Request, res: Response) => {
  req.body.order_id = req.params['orderId']; //Inject orderId to be verified.
  orderItemController.createOrderItem(req, res);
});

/**
 * @swagger
 * /orders/{orderId}/items/{itemId}:
 *   get:
 *     summary: Get an order item by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order containing the item.
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order item to retrieve.
 *     responses:
 *       200:
 *         description: The requested order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       404:
 *         description: Order item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order item was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.get('/:orderId/items/:itemId', authenticate, (req: Request, res: Response) => {
  orderItemController.getOrderItemById(req, res);
});

/**
 * @swagger
 * /orders/{orderId}/items/{itemId}:
 *   patch:
 *     summary: Update an existing order item
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order containing the item.
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order item to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The new ID of the product being ordered.
 *               quantity:
 *                 type: integer
 *                 description: The new quantity of the product being ordered.
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The new price of the product being ordered.
 *     responses:
 *       200:
 *         description: The updated order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error.
 *       404:
 *         description: Order item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order item was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.patch('/:orderId/items/:itemId', authenticate, (req: Request, res: Response) => {
  orderItemController.updateOrderItem(req, res);
});

/**
 * @swagger
 * /orders/{orderId}/items/{itemId}:
 *   delete:
 *     summary: Delete an order item by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order containing the item.
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order item to delete.
 *     responses:
 *       200:
 *         description: Order item deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the order item deletion.
 *       404:
 *         description: Order item not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the order item was not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the error.
 */
router.delete('/:orderId/items/:itemId', authenticate, (req: Request, res: Response) => {
  orderItemController.deleteOrderItem(req, res);
});

export default router;