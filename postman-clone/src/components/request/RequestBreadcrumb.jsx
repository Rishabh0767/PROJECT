import { FiSave } from 'react-icons/fi';

export default function RequestBreadcrumb({ 
  activeWorkspace, 
  currentTabData, 
  onUpdateRequest, 
  onShowSaveModal 
}) {
  return (
    <div className="px-4 py-2 bg-dark-bg flex items-center justify-between gap-2 text-xs flex-shrink-0">
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <span className="text-blue-500 font-bold text-sm">HTTP</span>
        <span className="text-dark-text-secondary">/</span>
        <span className="text-dark-text-secondary">{activeWorkspace?.name || 'My Workspace'}</span>
        {currentTabData.collection && (
          <>
            <span className="text-dark-text-secondary">/</span>
            <span className="text-dark-text-secondary">{currentTabData.collection}</span>
          </>
        )}
        <span className="text-dark-text-secondary">/</span>
        
        <input
          type="text"
          value={currentTabData.name || 'Untitled Request'}
          onChange={(e) => onUpdateRequest({ name: e.target.value })}
          className="bg-dark-bg border-0 text-dark-text text-xs focus:outline-none focus:ring-0 focus:bg-dark-hover px-2 py-1 rounded min-w-32 hover:bg-dark-hover transition cursor-text"
          placeholder="Request name"
        />
      </div>

      <button
        onClick={onShowSaveModal}
        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded transition flex items-center gap-2 text-xs font-medium border-0 flex-shrink-0"
      >
        <FiSave size={12} />
        Save
      </button>
    </div>
  );
}
