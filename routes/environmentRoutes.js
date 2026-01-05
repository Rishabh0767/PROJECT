import express from 'express';
import Environment from '../models/Environment.js';
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
  Environment.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  Environment.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  Environment.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Environment created', id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  Environment.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Environment updated' });
  });
});

router.delete('/:id', (req, res) => {
  Environment.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Environment deleted' });
  });
});

export default router;



/**
 * @swagger
 * tags:
 *   name: Environments
 *   description: Manage workspace environments and variables
 */

/**
 * @swagger
 * /environments:
 *   get:
 *     summary: Get all environments
 *     tags: [Environments]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of environments
 *   post:
 *     summary: Create an environment
 *     tags: [Environments]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required: [workspace_id, name]
 *             properties:
 *               workspace_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               variables:
 *                 type: string
 *     responses:
 *       201:
 *         description: Environment created
 */

/**
 * @swagger
 * /environments/{id}:
 *   get:
 *     summary: Get environment by ID
 *     tags: [Environments]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Environment found
 *   put:
 *     summary: Update environment
 *     tags: [Environments]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Environment'
 *     responses:
 *       200:
 *         description: Environment updated
 *   delete:
 *     summary: Delete environment
 *     tags: [Environments]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Environment deleted
 */
