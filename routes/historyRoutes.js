import express from 'express';
import db from '../config/db.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// Get user's history
router.get('/', (req, res) => {
  const user_id = req.user?.id;
  
  if (!user_id) {
    return res.status(400).json({ message: 'Invalid user token' });
  }

  db.query(
    'SELECT * FROM History WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [user_id],
    (err, results) => {
      if (err) {
        console.error('Error fetching history:', err);
        return res.status(500).json({ message: err.message });
      }
      res.json(results);
    }
  );
});

// Add to history (called automatically when request is sent)
router.post('/', (req, res) => {
  const { method, url, status_code, response_time } = req.body;
  const user_id = req.user?.id;

  if (!user_id) {
    return res.status(400).json({ message: 'Invalid user token' });
  }

  db.query(
    'INSERT INTO History (user_id, method, url, status_code, response_time) VALUES (?, ?, ?, ?, ?)',
    [user_id, method, url, status_code, response_time],
    (err, results) => {
      if (err) {
        console.error('Error saving to history:', err);
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: 'Saved to history', id: results.insertId });
    }
  );
});

// Clear all history
router.delete('/', (req, res) => {
  const user_id = req.user?.id;

  db.query('DELETE FROM History WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: 'History cleared' });
  });
});

export default router;
