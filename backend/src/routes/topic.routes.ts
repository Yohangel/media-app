import { Router } from 'express';
import { createTopic, getTopics, getTopicById, updateTopic, deleteTopic } from '@/controllers/topic.controller';
import { authenticate } from '@/middlewares/auth.middleware';
import { authorize } from '@/middlewares/authorization.middleware';

const router = Router();

/**
 * @openapi
 * /api/topics:
 *   post:
 *     summary: Create a topic
 *     description: Create a new topic.
 *     tags:
 *       - Topic
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
 *         description: Topic created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', authenticate, authorize(['admin']), createTopic);

/**
 * @openapi
 * /api/topics:
 *   get:
 *     summary: Get all topics
 *     description: Retrieve a list of all topics.
 *     tags:
 *       - Topic
 *     responses:
 *       200:
 *         description: List of topics
 *       500:
 *         description: Internal Server Error
 */
router.get('/', getTopics);

/**
 * @openapi
 * /api/topics/{id}:
 *   get:
 *     summary: Get topic by ID
 *     description: Retrieve a topic by its ID.
 *     tags:
 *       - Topic
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the topic
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Topic details
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', getTopicById);

/**
 * @openapi
 * /api/topics/{id}:
 *   put:
 *     summary: Update a topic
 *     description: Update a topic by its ID.
 *     tags:
 *       - Topic
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the topic
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
 *     responses:
 *       200:
 *         description: Topic updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/:id', authenticate, authorize(['admin']), updateTopic);

/**
 * @openapi
 * /api/topics/{id}:
 *   delete:
 *     summary: Delete a topic
 *     description: Delete a topic by its ID.
 *     tags:
 *       - Topic
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the topic
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Topic deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', authenticate, authorize(['admin']), deleteTopic);

export default router;
