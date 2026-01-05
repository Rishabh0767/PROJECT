import express from 'express';
import Request from '../models/Request.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);


router.get('/', (req, res) => {
  const { collection_id } = req.query;
  
  if (!collection_id) {
    return res.status(400).json({ message: 'collection_id is required' });
  }

  Request.getByCollection(collection_id, (err, results) => {
    if (err) {
      console.error('Error fetching requests:', err);
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  Request.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

router.post('/', (req, res) => {
  Request.create(req.body, (err, results) => {
    if (err) {
      console.error('Error creating request:', err);
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'Request created', id: results.insertId });
  });
});

router.put('/:id', (req, res) => {
  Request.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Request updated' });
  });
});

router.delete('/:id', (req, res) => {
  Request.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'Request deleted' });
  });
});

export default router;




/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Manage API requests inside collections
 */

/**
 * @swagger
 * /requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of requests
 *   post:
 *     summary: Create a request
 *     tags: [Requests]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             required: [collection_id, method, url]
 *             properties:
 *               collection_id:
 *                 type: integer
 *               method:
 *                 type: string
 *               url:
 *                 type: string
 *               headers:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       201:
 *         description: Request created
 */

/**
 * @swagger
 * /requests/{id}:
 *   get:
 *     summary: Get a request by ID
 *     tags: [Requests]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Request found
 *   put:
 *     summary: Update a request
 *     tags: [Requests]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Request'
 *     responses:
 *       200:
 *         description: Request updated
 *   delete:
 *     summary: Delete request
 *     tags: [Requests]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Request deleted
 */
