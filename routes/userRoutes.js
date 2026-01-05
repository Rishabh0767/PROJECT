import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Request body missing' });

  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'Missing required fields' });

  User.getByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create({ name, email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'User registered successfully', id: result.insertId });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error hashing password' });
    }
  });
});

router.post('/login', (req, res) => {
  if (!req.body) return res.status(400).json({ message: 'Request body missing' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  User.getByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, username: user.name });
  });
});

// Protected routes - example
router.get('/', authMiddleware, (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

router.get('/:id', authMiddleware, (req, res) => {
  User.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results[0]);
  });
});

router.put('/:id', authMiddleware, (req, res) => {
  User.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'User updated' });
  });
});

router.delete('/:id', authMiddleware, (req, res) => {
  User.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'User deleted' });
  });
});

export default router;



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage user accounts
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rishabh
 *               email:
 *                 type: string
 *                 example: rishabh@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate user and return JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: rishabh@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User found
 *   put:
 *     summary: Update user info
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: User deleted
 */
