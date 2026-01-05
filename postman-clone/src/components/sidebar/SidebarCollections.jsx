import { useState } from 'react';
import { FiMoreVertical, FiPlus, FiSearch } from 'react-icons/fi';
import CollectionItem from './CollectionItem';
import CreateCollectionModal from '../collections/CreateCollectionModal';
import { sidebarStyles } from './styles';

export default function SidebarCollections({
  collections,
  expandedCollections,
  onToggleCollection,
  onDeleteCollection,
  onRequestClick,
  onLoadCollections,
  searchQuery,
  setSearchQuery,
  activeWorkspace
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleCollectionCreated = () => {
    setShowCreateModal(false);
    setTimeout(onLoadCollections, 500);
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.requests?.some(req => 
      req.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.method?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      {/* Search Bar */}
      <div className="p-3 border-b" style={sidebarStyles.border}>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections..."
            className="w-full pl-9 pr-3 py-2 rounded text-sm"
            style={sidebarStyles.input}
          />
        </div>
      </div>

      {/* Header */}
      <div className="px-3 py-2 border-b flex items-center justify-between" style={sidebarStyles.border}>
        <h2 className="text-sm font-semibold text-gray-200">Collections</h2>
        
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 hover:bg-[#3e3e42] rounded transition text-gray-400 hover:text-gray-200"
            title="More options"
          >
            <FiMoreVertical size={16} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div 
                className="absolute right-0 top-8 z-20 rounded-md shadow-lg min-w-[180px] py-1"
                style={{ backgroundColor: '#1e1e1e', border: '1px solid #34373c' }}
              >
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-[#2d2d30] flex items-center gap-2"
                >
                  <FiPlus size={14} />
                  New Collection
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Collections List */}
      <div className="flex-1 overflow-y-auto">
        {!activeWorkspace ? (
          <div className="p-6 text-center text-gray-400">Loading...</div>
        ) : filteredCollections.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-sm">
            {searchQuery ? 'No collections found' : 'No Collections'}
          </div>
        ) : (
          <div className="p-2">
            {filteredCollections.map((col) => (
              <CollectionItem 
                key={col.id} 
                collection={col} 
                isExpanded={expandedCollections.has(col.id)} 
                onToggle={() => onToggleCollection(col.id)} 
                onDelete={() => onDeleteCollection(col.id)} 
                onRequestClick={onRequestClick}
                searchQuery={searchQuery}
              />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateCollectionModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={handleCollectionCreated} 
        />
      )}
    </>
  );
}
