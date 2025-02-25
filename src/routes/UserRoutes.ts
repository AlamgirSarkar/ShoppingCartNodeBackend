import express, { Request, Response } from 'express';
import User from '../models/User';
import { authenticate } from '../middleware/authMiddleware';
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID (MongoDB ObjectId)
 *         username:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         role:
 *           type: string
 *           enum: [customer, admin, vendor]
 *           description: The user's role within the system.
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (requires authentication)
 *     tags: [Users]
 *     description: Retrieve a list of all users in the system. Requires a valid JWT token in the Authorization header.
 *     security:
 *       - bearerAuth: []  # Use the bearerAuth security scheme
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - Missing or invalid JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating unauthorized access.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error object.
 */
router.get('/',authenticate, async (_req: Request, res: Response) => {
  console.log('get all users');
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});


//Get one user
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     description: Retrieve a specific user from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: The requested user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was not found.
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
router.get('/:id', async (req: any, res: any) => {
    try {
      const user = await User.findById(req.params['id']);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user); // Return the successful response
    } catch (err) {
      return res.status(500).json({ message: err.message }); // Return an error response
    }
  });

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email address
 *               password_hash:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [customer, admin, vendor]
 *                 description: The user's role (optional, defaults to 'customer')
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       500:
 *         description: Internal server error
 */
router.post('/', async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password_hash: req.body.password_hash, // TODO: Hash the password properly
    role: req.body.role
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one user
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags: [Users]
 *     description: Update specific fields of an existing user in the system.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new name for the user.
 *               email:
 *                 type: string
 *                 description: The new email address for the user.
 *               password_hash:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [customer, admin, vendor]
 *                 description: The new role for the user (customer, admin, or vendor).
 *     responses:
 *       200:
 *         description: The updated user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request (e.g., invalid input).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message describing the validation error or invalid input.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was not found.
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
router.patch('/:id', async (req: any, res: any) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.username != null) {
      user.username = req.body.username;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.password_hash != null) {
      user.password_hash = req.body.password_hash; // TODO: Hash the password properly
    }
    if (req.body.role != null) {
      user.role = req.body.role;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one user
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Deletes a specific user from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A confirmation message.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating that the user was not found.
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
router.delete('/:id', async (req: any, res:any) => {
    try {
      const user = await User.findById(req.params['id']); // Use bracket notation for params
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      await User.deleteOne({ _id: req.params['id'] }); // Use deleteOne on the Model
  
      return res.json({ message: 'User deleted successfully' });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  });

export default router;