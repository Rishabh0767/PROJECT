import db from '../config/db.js';

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM Users', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Users WHERE id = ?', [id], callback);
  },

  getByEmail: (email, callback) => {
    db.query('SELECT * FROM Users WHERE email = ?', [email], callback);
  },

  create: (data, callback) => {
    const { name, email, password } = data;
    db.query('INSERT INTO Users (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
  },

  update: (id, data, callback) => {
    const { name, email } = data;
    db.query('UPDATE Users SET name=?, email=? WHERE id=?', [name, email, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Users WHERE id=?', [id], callback);
  },
};

export default User;
