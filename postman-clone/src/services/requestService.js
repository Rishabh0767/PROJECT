import api from './api';

export const requestService = {
  async getByCollection(collectionId) {
    const response = await api.get(`/api/requests?collection_id=${collectionId}`);
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/api/requests/${id}`);
    return response.data;
  },

  async create(requestData) {
    const response = await api.post('/api/requests', requestData);
    return response.data;
  },

  async update(id, requestData) {
    const response = await api.put(`/api/requests/${id}`, requestData);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/requests/${id}`);
  }
};
