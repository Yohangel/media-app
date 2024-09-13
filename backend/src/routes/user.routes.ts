import { Router } from 'express';
import { registerUser, getUsers, updateUser, deleteUser, loginUser } from '@/controllers/user.controller';
import { authorize } from '@/middlewares/authorization.middleware';
import { authenticate } from '@/middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', registerUser);

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and return a token.
 *     tags:
 *       - User
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
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', loginUser); 

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update user details by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authenticate, authorize(['admin']), updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete user by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

export default router;
