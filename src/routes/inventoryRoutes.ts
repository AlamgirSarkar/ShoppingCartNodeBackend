import express, { Request, Response } from 'express';
import inventoryController from '../controllers/inventoryController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Create a new inventory entry
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new inventory entry in the system (requires authentication).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *               warehouse_id:
 *                 type: string
 *                 description: The ID of the warehouse.
 *               stock:
 *                 type: integer
 *                 description: The current stock quantity.
 *     responses:
 *       201:
 *         description: Inventory entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  inventoryController.createInventory(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Get an inventory entry by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific inventory entry from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the inventory entry.
 *     responses:
 *       200:
 *         description: The requested inventory entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Inventory entry not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  inventoryController.getInventoryById(req, res);
});

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory entries
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all inventory entries in the system (requires authentication).
 *     responses:
 *       200:
 *         description: A list of inventory entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  inventoryController.getAllInventories(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   patch:
 *     summary: Update an existing inventory entry
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     description: Update specific fields of an existing inventory entry in the system (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the inventory entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *               warehouse_id:
 *                 type: string
 *                 description: The ID of the warehouse.
 *               stock:
 *                 type: integer
 *                 description: The new stock quantity.
 *     responses:
 *       200:
 *         description: The updated inventory entry.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Inventory entry not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  inventoryController.updateInventory(req, res);
});

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Delete an inventory entry by ID
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific inventory entry from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the inventory entry.
 *     responses:
 *       200:
 *         description: Inventory entry deleted successfully.
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
 *         description: Inventory entry not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  inventoryController.deleteInventory(req, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The inventory ID (MongoDB ObjectId)
 *         product_id:
 *           type: string
 *           description: The ID of the product
 *         warehouse_id:
 *           type: string
 *           description: The ID of the warehouse
 *         stock:
 *           type: integer
 *           description: The quantity of the product in stock
 *   securitySchemes:
 *     bearerAuth:            # can be any name
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router;