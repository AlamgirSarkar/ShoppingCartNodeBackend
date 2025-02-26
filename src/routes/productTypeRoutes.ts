import express, { Request, Response } from 'express';
import productTypeController from '../controllers/productTypeController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the product type
 *         name:
 *           type: string
 *           description: The name of the product type (e.g., "T-Shirt", "Laptop")
 *         description:
 *           type: string
 *           nullable: true
 *           description: A more detailed description of the product type
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the product type was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the product type was last updated
 */

/**
 * @swagger
 * /product-types:
 *   post:
 *     summary: Create a new product type
 *     tags: [Product Types]
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
 *                 description: The name of the product type (required)
 *               description:
 *                 type: string
 *                 description: A detailed description of the product type (optional)
 *     responses:
 *       201:
 *         description: The created product type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductType'
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  productTypeController.createProductType(req, res);
});

/**
 * @swagger
 * /product-types/{id}:
 *   get:
 *     summary: Get a product type by ID
 *     tags: [Product Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product type to retrieve
 *     responses:
 *       200:
 *         description: The product type object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductType'
 *       404:
 *         description: Product type not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  productTypeController.getProductTypeById(req, res);
});

/**
 * @swagger
 * /product-types:
 *   get:
 *     summary: Get all product types
 *     tags: [Product Types]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of product types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductType'
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  productTypeController.getAllProductTypes(req, res);
});

/**
 * @swagger
 * /product-types/{id}:
 *   patch:
 *     summary: Update a product type
 *     tags: [Product Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the product type (optional)
 *               description:
 *                 type: string
 *                 description: The new description of the product type (optional)
 *     responses:
 *       200:
 *         description: The updated product type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductType'
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Product type not found
 *       500:
 *         description: Internal server error
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  productTypeController.updateProductType(req, res);
});

/**
 * @swagger
 * /product-types/{id}:
 *   delete:
 *     summary: Delete a product type
 *     tags: [Product Types]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product type to delete
 *     responses:
 *       200:
 *         description: Product type deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Product type not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  productTypeController.deleteProductType(req, res);
});

/**
 * @swagger
 * /product-types/{id}/{userPincode}:
 *   get:
 *     summary: Get the product from nearest location
 *     tags: [Product Types]
 *     description: Retrieve a specific product from the nearest warehouse, and return it.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the product.
 *       - in: path
 *         name: userPincode
 *         required: true
 *         schema:
 *           type: number
 *         description: User's pincode
 *     responses:
 *       200:
 *         description: The requested product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the product was not found.
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
router.get('/:id/:userPincode', authenticate, (req: Request, res: Response) => {
  productTypeController.getProductNearestLocation(req, res);
});
export default router;