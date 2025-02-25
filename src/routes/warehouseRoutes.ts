import express, { Request, Response } from 'express';
import warehouseController from '../controllers/warehouseController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /warehouses:
 *   post:
 *     summary: Create a new warehouse
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new warehouse in the system (requires authentication).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the warehouse.
 *               address:
 *                 type: string
 *                 description: The address of the warehouse.
 *               latitude:
 *                 type: number
 *                 description: The latitude of the warehouse.
 *               longitude:
 *                 type: number
 *                 description: The longitude of the warehouse.
 *               region:
 *                 type: string
 *                 description: The region where the warehouse is located.
 *     responses:
 *       201:
 *         description: Warehouse created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  warehouseController.createWarehouse(req, res);
});

/**
 * @swagger
 * /warehouses/{id}:
 *   get:
 *     summary: Get a warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific warehouse from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the warehouse.
 *     responses:
 *       200:
 *         description: The requested warehouse.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Warehouse not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  warehouseController.getWarehouseById(req, res);
});

/**
 * @swagger
 * /warehouses:
 *   get:
 *     summary: Get all warehouses
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all warehouses in the system (requires authentication).
 *     responses:
 *       200:
 *         description: A list of warehouses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Warehouse'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  warehouseController.getAllWarehouses(req, res);
});

/**
 * @swagger
 * /warehouses/{id}:
 *   patch:
 *     summary: Update an existing warehouse
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Update specific fields of an existing warehouse in the system (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the warehouse.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the warehouse.
 *               address:
 *                 type: string
 *                 description: The new address of the warehouse.
 *               latitude:
 *                 type: number
 *                 description: The new latitude of the warehouse.
 *               longitude:
 *                 type: number
 *                 description: The new longitude of the warehouse.
 *               region:
 *                 type: string
 *                 description: The new region of the warehouse.
 *     responses:
 *       200:
 *         description: The updated warehouse.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Warehouse'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Warehouse not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  warehouseController.updateWarehouse(req, res);
});

/**
 * @swagger
 * /warehouses/{id}:
 *   delete:
 *     summary: Delete a warehouse by ID
 *     tags: [Warehouses]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific warehouse from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the warehouse.
 *     responses:
 *       200:
 *         description: Warehouse deleted successfully.
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
 *         description: Warehouse not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  warehouseController.deleteWarehouse(req, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Warehouse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The warehouse ID (MongoDB ObjectId)
 *         name:
 *           type: string
 *           description: The name of the warehouse
 *         address:
 *           type: string
 *           description: The address of the warehouse
 *         latitude:
 *           type: number
 *           description: The latitude of the warehouse location
 *         longitude:
 *           type: number
 *           description: The longitude of the warehouse location
 *         region:
 *           type: string
 *           description: The region where the warehouse is located
 *   securitySchemes:
 *     bearerAuth:            # can be any name
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
export default router;