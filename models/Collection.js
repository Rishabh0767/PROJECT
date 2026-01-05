import db from '../config/db.js';

const Collection = {
  getAll: (callback) => {
    db.query('SELECT * FROM Collections', callback);
  },

  getByWorkspace: (workspaceId, callback) => {
    db.query('SELECT * FROM Collections WHERE workspace_id = ?', [workspaceId], callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM Collections WHERE id = ?', [id], callback);
  },

  create: (data, callback) => {
    const { name, workspace_id } = data;
    db.query('INSERT INTO Collections (name, workspace_id) VALUES (?, ?)', [name, workspace_id], callback);
  },

  update: (id, data, callback) => {
    const { name } = data;
    db.query('UPDATE Collections SET name = ? WHERE id = ?', [name, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Collections WHERE id = ?', [id], callback);
  },
};

export default Collection;
