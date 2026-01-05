import { FiX, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function SaveRequestModal({
  collections,
  selectedCollection,
  setSelectedCollection,
  newCollectionName,
  setNewCollectionName,
  isCreatingNew,
  setIsCreatingNew,
  onSave,
  onCreateAndSave,
  onClose
}) {
  
  const handleSave = () => {
    if (isCreatingNew) {
      if (!newCollectionName.trim()) {
        toast.error('Enter collection name');
        return;
      }
      onCreateAndSave();
    } else {
      if (!selectedCollection) {
        toast.error('Select a collection');
        return;
      }
      onSave(parseInt(selectedCollection));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-dark-bg rounded-lg shadow-2xl w-full max-w-md border border-dark-border">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-dark-border flex justify-between items-center">
          <h3 className="text-lg font-semibold text-dark-text">Save Request</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* Toggle Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreatingNew(false)}
              className={`flex-1 py-2 px-4 rounded font-medium text-sm transition ${
                !isCreatingNew
                  ? 'bg-primary text-white'
                  : 'bg-dark-hover text-dark-text hover:bg-dark-border border border-dark-border'
              }`}
            >
              Existing
            </button>
            <button
              onClick={() => setIsCreatingNew(true)}
              className={`flex-1 py-2 px-4 rounded font-medium text-sm transition ${
                isCreatingNew
                  ? 'bg-primary text-white'
                  : 'bg-dark-hover text-dark-text hover:bg-dark-border border border-dark-border'
              }`}
            >
              New
            </button>
          </div>

          {/* Existing Collection */}
          {!isCreatingNew && (
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-2">
                Select Collection
              </label>
              {collections.length === 0 ? (
                <p className="text-xs text-dark-text-secondary p-3 bg-dark-hover rounded">
                  No collections yet. Create one first.
                </p>
              ) : (
                <select
                  value={selectedCollection}
                  onChange={(e) => setSelectedCollection(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">-- Select Collection --</option>
                  {collections.map(col => (
                    <option key={col.id} value={col.id}>
                      {col.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          )}

          {/* New Collection */}
          {isCreatingNew && (
            <div>
              <label className="block text-xs font-medium text-dark-text-secondary mb-2">
                Collection Name
              </label>
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                placeholder="e.g., User API"
                autoFocus
                className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-dark-border flex justify-end gap-2 bg-dark-hover">
          <button
            onClick={onClose}
            className="px-4 py-2 text-dark-text hover:bg-dark-border rounded transition border border-dark-border"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition flex items-center gap-2"
          >
            <FiPlus size={16} />
            Save Request
          </button>
        </div>
      </div>
    </div>
  );
}
