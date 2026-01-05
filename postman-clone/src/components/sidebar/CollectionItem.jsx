import { FiChevronRight, FiChevronDown, FiFolder, FiTrash2 } from 'react-icons/fi';
import { getMethodColor } from '../../utils/sidebarHelpers';

export default function CollectionItem({ 
  collection, 
  isExpanded, 
  onToggle, 
  onDelete, 
  onRequestClick, 
  searchQuery 
}) {
  const highlightText = (text) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() ? 
        <span key={i} className="bg-yellow-400 bg-opacity-30">{part}</span> : part
    );
  };

  return (
    <div className="border-b" style={{ borderColor: '#2b2b2b' }}>
      <div 
        className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#2c2c2c] transition" 
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
          <FiFolder size={14} className="text-blue-400" />
          <span className="text-sm text-gray-100">{highlightText(collection.name)}</span>
          <span className="text-xs text-gray-500">({collection.requests?.length || 0})</span>
        </div>
        <button 
          className="text-xs text-red-400 hover:text-red-300" 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <FiTrash2 size={12} />
        </button>
      </div>

      {isExpanded && (
        <div className="bg-[rgb(40,40,40)]">
          {collection.requests?.length === 0 ? (
            <div className="pl-8 pr-2 py-2 text-xs text-gray-500 italic">No requests</div>
          ) : (
            collection.requests?.map((r) => (
              <div 
                key={r.id} 
                className="pl-8 pr-2 py-2 text-sm hover:bg-[#252525] cursor-pointer border-b border-[#2b2b2b] flex items-center gap-2" 
                onClick={() => onRequestClick(r)}
              >
                <span 
                  className="font-bold text-xs px-2 py-0.5 rounded" 
                  style={{ backgroundColor: getMethodColor(r.method) + '20', color: getMethodColor(r.method) }}
                >
                  {r.method.toUpperCase()}
                </span>
                <span className="text-gray-300 text-xs truncate">{highlightText(r.name || r.url)}</span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
