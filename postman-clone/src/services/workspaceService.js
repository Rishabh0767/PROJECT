import api from './api';

export const workspaceService = {
  async getAll() {
    const response = await api.get('/api/workspaces');
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/api/workspaces/${id}`);
    return response.data;
  },

  async create(name) {
    const response = await api.post('/api/workspaces', { name });
    return response.data;
  },

  async update(id, name) {
    const response = await api.put(`/api/workspaces/${id}`, { name });
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/workspaces/${id}`);
  }
};
