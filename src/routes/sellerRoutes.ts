import express, { Request, Response } from 'express';
import sellerController from '../controllers/sellerController';
import { authenticate } from '../middleware/authMiddleware'; 

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Sellers
 *   description: API endpoints for managing sellers
 */

/**
 * @swagger
 * /sellers:
 *   post:
 *     summary: Create a new seller
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the seller
 *               description:
 *                 type: string
 *                 description: A brief description of the seller
 *               pincodes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of pincodes where the seller operates
 *               user_id:
 *                 type: string
 *                 description: User Id of a seller
 *     responses:
 *       201:
 *         description: Seller created successfully
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, (req: Request, res: Response) => {
    sellerController.createSeller(req, res);
});

/**
 * @swagger
 * /sellers/{id}:
 *   get:
 *     summary: Get a seller by ID
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the seller
 *     responses:
 *       200:
 *         description: The requested seller
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
    sellerController.getSellerById(req, res);
});

/**
 * @swagger
 * /sellers:
 *   get:
 *     summary: Get all sellers
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of sellers
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, (req: Request, res: Response) => {
    sellerController.getAllSellers(req, res);
});

/**
 * @swagger
 * /sellers/{id}:
 *   patch:
 *     summary: Update an existing seller
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the seller to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the seller
 *               description:
 *                 type: string
 *                 description: A brief description of the seller
 *               pincodes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of pincodes where the seller operates
 *     responses:
 *       200:
 *         description: The updated seller
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
    sellerController.updateSeller(req, res);
});

/**
 * @swagger
 * /sellers/{id}:
 *   delete:
 *     summary: Delete a seller by ID
 *     tags: [Sellers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the seller to delete
 *     responses:
 *       200:
 *         description: Seller deleted successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
    sellerController.deleteSeller(req, res);
});

export default router;