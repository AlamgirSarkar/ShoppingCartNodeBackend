import express from 'express';
import { register, login, requestOTP, verifyOTP, token } from '../controllers/authController';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: User's username
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *               firstName:
 *                 type: string
 *                 description: User's first name
 *               lastName:
 *                 type: string
 *                 description: User's last name
 *               otp:
 *                 type: string
 *                 description: OTP received via email
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User object
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Bad request (e.g., invalid OTP, email already exists)
 *       500:
 *         description: Internal server error
 */
router.post('/register', register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User object
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/otp/request:
 *   post:
 *     summary: Request an OTP for login or registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               purpose:
 *                 type: string
 *                 enum: [login, register, password_reset]
 *                 description: Purpose of the OTP request
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request (e.g., invalid email or purpose)
 *       500:
 *         description: Internal server error
 */
router.post('/otp/request', requestOTP);

/**
 * @swagger
 * /auth/otp/verify:
 *   post:
 *     summary: Verify OTP and complete login or registration
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               otp:
 *                 type: string
 *                 description: OTP received via email
 *               purpose:
 *                 type: string
 *                 enum: [login, register, password_reset]
 *                 description: Purpose of the OTP verification
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User object
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid OTP
 *       404:
 *         description: User not found (for registration)
 *       500:
 *         description: Internal server error
 */
router.post('/otp/verify', verifyOTP);


/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: Get a new Access token with Refresh Token
 *     tags: [Authentication]
 *     description: Use Refresh token to get a new Access token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token sent after login or last access token refresh.
 *     responses:
 *       200:
 *         description: A new access token object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token to authorize requests.
 *                 refreshToken:
 *                   type: string
 *                   description: New refresh token to authorize requests with time expiration.
 *       401:
 *         description: User Authentication failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Inform why user authenticaiton failed.
 */
router.post('/token', token); 
export default router;