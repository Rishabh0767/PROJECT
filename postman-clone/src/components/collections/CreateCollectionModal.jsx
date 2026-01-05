import { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { collectionService } from '../../services/collectionService';
import { toast } from 'react-toastify';
import Modal from '../common/Modal';

export default function CreateCollectionModal({ onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { activeWorkspace } = useWorkspace();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Collection name is required');
      return;
    }

    if (!activeWorkspace) {
      toast.error('No workspace selected');
      return;
    }

    setIsLoading(true);
    try {
      await collectionService.create(name.trim(), activeWorkspace.id);
      toast.success('Collection created successfully!');
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create collection');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Create New Collection" size="sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Collection Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., My API Collection"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            autoFocus
            disabled={isLoading}
          />
          <p className="mt-2 text-xs text-gray-500">
            Give your collection a meaningful name to organize your requests
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
          >
            {isLoading ? 'Creating...' : 'Create Collection'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
