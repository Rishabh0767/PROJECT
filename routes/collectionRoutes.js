import express from 'express';
import Collection from '../models/Collection.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(authMiddleware);


router.get('/', (req, res) => {
  const { workspace_id } = req.query;
  
  if (!workspace_id) {
    return res.status(400).json({ message: 'workspace_id is required' });
  }

  Collection.getByWorkspace(workspace_id, (err, results) => {
    if (err) {
      console.error('Error fetching collections:', err);
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  Collection.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  Collection.create(req.body, (err, results) => {
    if (err) {
      console.error('Error creating collection:', err);
      return res.status(500).json({ message: err.message });
    }
    res.json({ 
      message: 'Collection created', 
      id: results.insertId,
      name: req.body.name,
      workspace_id: req.body.workspace_id
    });
  });
});

router.put('/:id', (req, res) => {
  Collection.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Collection updated' });
  });
});

router.delete('/:id', (req, res) => {
  Collection.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Collection deleted' });
  });
});

export default router;




/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: Manage API collections in a workspace
 */

/**
 * @swagger
 * /collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Collections]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of collections
 *   post:
 *     summary: Create new collection
 *     tags: [Collections]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required: [name, workspace_id]
 *             properties:
 *               name:
 *                 type: string
 *               workspace_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Collection created
 */

/**
 * @swagger
 * /collections/{id}:
 *   get:
 *     summary: Get collection by ID
 *     tags: [Collections]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Collection found
 *   put:
 *     summary: Update collection
 *     tags: [Collections]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collection'
 *     responses:
 *       200:
 *         description: Collection updated
 *   delete:
 *     summary: Delete collection
 *     tags: [Collections]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Collection deleted
 */
