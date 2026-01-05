import db from '../config/db.js';

const Request = {
  getAll: (callback) => {
    db.query('SELECT * FROM Requests', callback);
  },

  getByCollection: (collectionId, callback) => {
    db.query('SELECT * FROM Requests WHERE collection_id = ?', [collectionId], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Requests WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { collection_id, method, url, headers, body } = data;
    db.query(
      'INSERT INTO Requests (collection_id, method, url, headers, body) VALUES (?, ?, ?, ?, ?)',
      [collection_id, method, url, headers, body],
      callback
    );
  },

  update: (id, data, callback) => {
    const { method, url, headers, body } = data;
    db.query(
      'UPDATE Requests SET method = ?, url = ?, headers = ?, body = ? WHERE id = ?',
      [method, url, headers, body, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Requests WHERE id = ?', [id], callback);
  },
};

export default Request;
