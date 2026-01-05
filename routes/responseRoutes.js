import express from 'express';
import Response from '../models/Response.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();



router.use(authMiddleware);

router.get('/', (req, res) => {
  Workspace.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

router.get('/', (req, res) => {
  Response.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  Response.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  Response.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Response created', id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  Response.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Response updated' });
  });
});

router.delete('/:id', (req, res) => {
  Response.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Response deleted' });
  });
});

export default router;



/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: Manage saved responses for requests
 */

/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Get all responses
 *     tags: [Responses]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of responses
 *   post:
 *     summary: Create a response
 *     tags: [Responses]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required: [request_id, status_code]
 *             properties:
 *               request_id:
 *                 type: integer
 *               status_code:
 *                 type: integer
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Response created
 */

/**
 * @swagger
 * /responses/{id}:
 *   get:
 *     summary: Get response by ID
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Response found
 *   put:
 *     summary: Update response
 *     tags: [Responses]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: Response updated
 *   delete:
 *     summary: Delete response
 *     tags: [Responses]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Response deleted
 */
