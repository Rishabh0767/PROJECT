import db from '../config/db.js';

const Response = {
  getAll: (callback) => {
    db.query('SELECT * FROM Responses', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Responses WHERE id=?', [id], callback);
  },

  create: (data, callback) => {
    const { request_id, status_code, body } = data;
    db.query(
      'INSERT INTO Responses (request_id, status_code, body) VALUES (?, ?, ?)',
      [request_id, status_code, body],
      callback
    );
  },

  update: (id, data, callback) => {
    const { status_code, body } = data;
    db.query('UPDATE Responses SET status_code=?, body=? WHERE id=?', [status_code, body, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Responses WHERE id=?', [id], callback);
  },
};

export default Response;
