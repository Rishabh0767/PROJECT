import db from '../config/db.js';

const History = {
  create: (data, callback) => {
    const query = 'INSERT INTO History (user_id, method, url, status_code, response_time) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.user_id, data.method, data.url, data.status_code, data.response_time], callback);
  },

  getByUserId: (userId, callback) => {
    const query = 'SELECT * FROM History WHERE user_id = ? ORDER BY created_at DESC LIMIT 50';
    db.query(query, [userId], callback);
  },

  deleteAll: (userId, callback) => {
    const query = 'DELETE FROM History WHERE user_id = ?';
    db.query(query, [userId], callback);
  }
};

export default History;
