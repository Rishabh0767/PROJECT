import api from './api';

export const environmentService = {
  async getByWorkspace(workspaceId) {
    const response = await api.get(`/api/environments?workspace_id=${workspaceId}`);
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/api/environments/${id}`);
    return response.data;
  },

  async create(name, workspaceId, variables) {
    const response = await api.post('/api/environments', {
      name,
      workspace_id: workspaceId,
      variables: JSON.stringify(variables)
    });
    return response.data;
  },

  async update(id, name, variables) {
    const response = await api.put(`/api/environments/${id}`, {
      name,
      variables: JSON.stringify(variables)
    });
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/environments/${id}`);
  }
};
