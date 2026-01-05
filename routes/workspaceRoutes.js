import express from 'express';
import Workspace from '../models/Workspace.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);

router.get('/', (req, res) => {
  const user_id = req.user?.id;
  if (!user_id) return res.status(400).json({ message: 'Invalid user token' });

  Workspace.getByUserId(user_id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// ✅ Get a single workspace by ID
router.get('/:id', (req, res) => {
  Workspace.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

// ✅ Create workspace for logged-in user
router.post('/', (req, res) => {
  const { name } = req.body;
  const user_id = req.user?.id;

  if (!name || !user_id) {
    return res.status(400).json({ message: 'Workspace name and valid user are required' });
  }

  Workspace.create({ name, user_id }, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({
      message: 'Workspace created',
      id: results.insertId,
      name,
      user_id
    });
  });
});

// ✅ Update workspace
router.put('/:id', (req, res) => {
  Workspace.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Workspace updated' });
  });
});

// ✅ Delete workspace
router.delete('/:id', (req, res) => {
  Workspace.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Workspace deleted' });
  });
});

export default router;

/**
 * @swagger
 * tags:
 *   name: Workspaces
 *   description: Manage workspaces linked to authenticated users
 */

/**
 * @swagger
 * /workspaces:
 *   get:
 *     summary: Get all workspaces for the authenticated user
 *     tags: [Workspaces]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of workspaces belonging to the logged-in user
 *   post:
 *     summary: Create a new workspace for the logged-in user
 *     tags: [Workspaces]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My First Workspace"
 *     responses:
 *       201:
 *         description: Workspace created
 *       400:
 *         description: Invalid input or missing name
 */

/**
 * @swagger
 * /workspaces/{id}:
 *   get:
 *     summary: Get a workspace by ID
 *     tags: [Workspaces]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workspace found
 *   put:
 *     summary: Update workspace details
 *     tags: [Workspaces]
 *     security: [ { bearerAuth: [] } ]
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
 *         description: Workspace updated
 *   delete:
 *     summary: Delete workspace
 *     tags: [Workspaces]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Workspace deleted
 */

// ✅ Get all workspaces for logged-in user