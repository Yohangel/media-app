import { Router } from 'express';
import { createRole, getAllRoles } from '@/controllers/role.controller';
import { authenticate } from '@/middlewares/auth.middleware';
import { authorize } from '@/middlewares/authorization.middleware';

const router = Router();

/**
 * @openapi
 * /api/roles:
 *   post:
 *     summary: Create a role
 *     description: Create a new role.
 *     tags:
 *       - Role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Role created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticate, authorize(['admin']), createRole);

/**
 * @openapi
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     description: Retrieve a list of all roles.
 *     tags:
 *       - Role
 *     responses:
 *       200:
 *         description: List of roles
 *       500:
 *         description: Internal Server Error
 */
router.get('/', authenticate, authorize(['admin']), getAllRoles);

export default router;
