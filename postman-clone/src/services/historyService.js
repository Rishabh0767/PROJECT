import api from './api';

export const historyService = {
  async getAll() {
    try {
      const response = await api.get('/api/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  },

  async clear() {
    try {
      await api.delete('/api/history');
    } catch (error) {
      console.error('Error clearing history:', error);
      throw error;
    }
  },

  async add(method, url, statusCode, responseTime) {
    try {
      console.log('📤 Sending to API:', { method, url, statusCode, responseTime });
      
      const response = await api.post('/api/history', {
        method,
        url,
        status_code: statusCode,
        response_time: responseTime
      });
      
      console.log('✅ API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding to history:', error);
      throw error;
    }
  }
};
