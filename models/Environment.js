import db from '../config/db.js';

const Environment = {
  getAll: (callback) => {
    db.query('SELECT * FROM Environments', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Environments WHERE id=?', [id], callback);
  },

  create: (data, callback) => {
    const { workspace_id, name, variables } = data;
    db.query(
      'INSERT INTO Environments (workspace_id, name, variables) VALUES (?, ?, ?)',
      [workspace_id, name, variables],
      callback
    );
  },

  update: (id, data, callback) => {
    const { name, variables } = data;
    db.query('UPDATE Environments SET name=?, variables=? WHERE id=?', [name, variables, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Environments WHERE id=?', [id], callback);
  },
};

export default Environment;
