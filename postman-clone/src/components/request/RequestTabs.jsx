import { FiPlus, FiX } from 'react-icons/fi';
import { getMethodTextColor } from '../../utils/requestHelpers';
import { requestStyles } from '../../utils/requestStyles';

export default function RequestTabs({ 
  tabs, 
  activeTabId, 
  onSwitchTab, 
  onCloseTab, 
  onAddTab 
}) {
  return (
    <div className={requestStyles.tabContainer}>
      {tabs.map(tab => (
        <div
          key={tab.id}
          onClick={() => onSwitchTab(tab.id)}
          className={`px-4 py-2 cursor-pointer flex items-center gap-2 transition-all group relative ${
            activeTabId === tab.id ? requestStyles.activeTab : requestStyles.inactiveTab
          }`}
        >
          <span 
            className="text-xs font-semibold"
            style={{ color: getMethodTextColor(tab.method) }}
          >
            {tab.method}
          </span>
          
          <span className="truncate max-w-xs text-xs text-gray-300">
            {tab.name || 'New Request'}
          </span>

          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition ml-1"
              aria-label="Close tab"
            >
              <FiX size={12} />
            </button>
          )}

          {activeTabId === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
          )}
        </div>
      ))}

      <button
        onClick={onAddTab}
        className="px-3 py-2 text-gray-400 hover:text-white cursor-pointer text-xs hover:bg-gray-700 transition"
        title="Add New Tab (Ctrl+T)"
        aria-label="Add new tab"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
}
