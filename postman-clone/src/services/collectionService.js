import api from './api';

export const collectionService = {
  
  // Get all collections for a workspace
  async getByWorkspace(workspaceId) {
    try {
      console.log('📥 Fetching collections for workspace:', workspaceId);
      const response = await api.get(`/api/collections?workspace_id=${workspaceId}`);
      console.log('✅ Collections loaded:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching collections:', error);
      throw error;
    }
  },

  // Create new collection
  async create(name, workspaceId) {
    try {
      console.log('📝 Creating collection:', { name, workspaceId });
      const response = await api.post('/api/collections', {
        name,
        workspace_id: workspaceId
      });
      console.log('✅ Collection created:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating collection:', error);
      throw error;
    }
  },

  // Save request to collection
  async saveRequest(requestData) {
    try {
      console.log('📥 Saving request to collection:', requestData);
      const response = await api.post('/api/requests', requestData);
      console.log('✅ Request saved:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error saving request:', error);
      throw error;
    }
  },

  // Delete collection
  async delete(collectionId) {
    try {
      console.log('🗑️ Deleting collection:', collectionId);
      await api.delete(`/api/collections/${collectionId}`);
      console.log('✅ Collection deleted');
    } catch (error) {
      console.error('❌ Error deleting collection:', error);
      throw error;
    }
  }
};
