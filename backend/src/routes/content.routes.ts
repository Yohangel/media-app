import { Router } from 'express';
import { createContent, getAllContent, getContentById, updateContent, deleteContent } from '@/controllers/content.controller';
import { authenticate } from '@/middlewares/auth.middleware';
import { authorize } from '@/middlewares/authorization.middleware';
import { upload } from '@/middlewares/upload.middleware'; 

const router = Router();

/**
 * @openapi
 * /api/content:
 *   post:
 *     summary: Create content
 *     description: Create new content. You can either upload a file or provide a URL. If uploading a file, use multipart/form-data. If providing a URL, include it in the request body.
 *     tags:
 *       - Content
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *               topic:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               type:
 *                 type: string
 *               topic:
 *                 type: string
 *     responses:
 *       201:
 *         description: Content created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticate, authorize(['admin', 'editor']), upload.single('file'), createContent);

/**
 * @openapi
 * /api/content:
 *   get:
 *     summary: Get all content
 *     description: Retrieve a list of all content.
 *     tags:
 *       - Content
 *     responses:
 *       200:
 *         description: List of content
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getAllContent);

/**
 * @openapi
 * /api/content/{id}:
 *   get:
 *     summary: Get content by ID
 *     description: Retrieve content by its ID.
 *     tags:
 *       - Content
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the content
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Content details
 *       404:
 *         description: Content not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', authenticate, getContentById);

/**
 * @openapi
 * /api/content/{id}:
 *   put:
 *     summary: Update content
 *     description: Update content by ID. You can either upload a file or provide a URL. If uploading a file, use multipart/form-data. If providing a URL, include it in the request body.
 *     tags:
 *       - Content
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the content
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               type:
 *                 type: string
 *               topic:
 *                 type: string
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               type:
 *                 type: string
 *               topic:
 *                 type: string
 *     responses:
 *       200:
 *         description: Content updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authenticate, authorize(['admin', 'editor']), upload.single('file'), updateContent);

/**
 * @openapi
 * /api/content/{id}:
 *   delete:
 *     summary: Delete content
 *     description: Delete content by ID.
 *     tags:
 *       - Content
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the content
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Content deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Content not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteContent);

export default router;
