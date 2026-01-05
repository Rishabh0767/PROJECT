import api from './api';

export const responseService = {
  async getByRequest(requestId) {
    const response = await api.get(`/api/responses?request_id=${requestId}`);
    return response.data;
  },

  async create(requestId, statusCode, body) {
    const response = await api.post('/api/responses', {
      request_id: requestId,
      status_code: statusCode,
      body: typeof body === 'string' ? body : JSON.stringify(body)
    });
    return response.data;
  },

  async delete(id) {
    await api.delete(`/api/responses/${id}`);
  }
};
