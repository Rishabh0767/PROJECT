import { getMethodTextColor } from '../../utils/requestHelpers';

export default function RequestLine({ 
  currentTabData, 
  onUpdateRequest, 
  onSend 
}) {
  return (
    <div className="p-4 flex gap-2 bg-dark-bg flex-shrink-0">
      <select
        value={currentTabData.method}
        onChange={(e) => onUpdateRequest({ method: e.target.value })}
        className="bg-dark-bg border-2 px-3 py-2 rounded text-sm font-bold transition w-24 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary"
        style={{ 
          color: getMethodTextColor(currentTabData.method),
          borderColor: '#34373c'
        }}
      >
        <option value="GET" style={{ backgroundColor: '#1e1e1e', color: '#50e3c2' }}>GET</option>
        <option value="POST" style={{ backgroundColor: '#1e1e1e', color: '#fca130' }}>POST</option>
        <option value="PUT" style={{ backgroundColor: '#1e1e1e', color: '#61affe' }}>PUT</option>
        <option value="PATCH" style={{ backgroundColor: '#1e1e1e', color: '#a78bfa' }}>PATCH</option>
        <option value="DELETE" style={{ backgroundColor: '#1e1e1e', color: '#f93e3e' }}>DELETE</option>
      </select>

      <input
        type="text"
        value={currentTabData.url || ''}
        onChange={(e) => onUpdateRequest({ url: e.target.value })}
        placeholder="http://localhost:5000/api/..."
        className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-sm focus:outline-none focus:ring-1 focus:ring-primary transition placeholder-dark-text-secondary"
      />

      <button
        onClick={onSend}
        disabled={currentTabData.loading}
        className="text-white px-6 py-2 rounded transition font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        style={{ backgroundColor: 'rgb(2, 101, 210)', transition: 'all 0.2s ease' }}
        onMouseEnter={(e) => { if (!currentTabData.loading) e.target.style.backgroundColor = 'rgb(1, 82, 174)'; }}
        onMouseLeave={(e) => { if (!currentTabData.loading) e.target.style.backgroundColor = 'rgb(2, 101, 210)'; }}
      >
        {currentTabData.loading ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : 'Send'}
      </button>
    </div>
  );
}
