import db from '../config/db.js';

const Workspace = {
  getByUserId: (userId, callback) => {
    db.query('SELECT * FROM Workspaces WHERE user_id = ?', [userId], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO Workspaces SET ?', data, callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Workspaces WHERE id = ?', [id], callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE Workspaces SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Workspaces WHERE id = ?', [id], callback);
  }
};

export default Workspace;
