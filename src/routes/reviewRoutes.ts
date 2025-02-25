import express, { Request, Response } from 'express';
import reviewController from '../controllers/reviewController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Creates a new review in the system (requires authentication).
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
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *               rating:
 *                 type: integer
 *                 description: The rating given by the user (1-5).
 *               comment:
 *                 type: string
 *                 description: The comment provided by the user (optional).
 *     responses:
 *       201:
 *         description: Review created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.post('/', authenticate, (req: Request, res: Response) => {
  reviewController.createReview(req, res);
});

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a specific review from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the review.
 *     responses:
 *       200:
 *         description: The requested review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, (req: Request, res: Response) => {
  reviewController.getReviewById(req, res);
});

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve a list of all reviews in the system (requires authentication).
 *     responses:
 *       200:
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized (requires authentication).
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, (req: Request, res: Response) => {
  reviewController.getAllReviews(req, res);
});

/**
 * @swagger
 * /reviews/{id}:
 *   patch:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Update specific fields of an existing review in the system (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the review.
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
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *               rating:
 *                 type: integer
 *                 description: The new rating given by the user (1-5).
 *               comment:
 *                 type: string
 *                 description: The new comment provided by the user (optional).
 *     responses:
 *       200:
 *         description: The updated review.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *       401:
 *         description: Unauthorized (requires authentication).
 *       404:
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:id', authenticate, (req: Request, res: Response) => {
  reviewController.updateReview(req, res);
});

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     description: Delete a specific review from the system by its ID (requires authentication).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the review.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
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
 *         description: Review not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, (req: Request, res: Response) => {
  reviewController.deleteReview(req, res);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The review ID (MongoDB ObjectId)
 *         user_id:
 *           type: string
 *           description: The ID of the user
 *         product_id:
 *           type: string
 *           description: The ID of the product
 *         rating:
 *           type: integer
 *           description: The rating given by the user (1-5)
 *         comment:
 *           type: string
 *           description: The comment provided by the user
 */
export default router;