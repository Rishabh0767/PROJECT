import { FiRefreshCw, FiTrash2, FiSearch } from 'react-icons/fi';
import { formatTime, groupHistoryByDate, getMethodColor } from '../../utils/sidebarHelpers';
import { sidebarStyles } from './styles';

export default function SidebarHistory({
  history,
  loadingHistory,
  searchQuery,
  setSearchQuery,
  onLoadHistory,
  onClearHistory,
  onLoadRequest
}) {
  const filteredHistory = history.filter(item =>
    item.url?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.method?.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search history..."
            className="w-full pl-9 pr-3 py-2 rounded text-sm"
            style={sidebarStyles.input}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 border-b flex gap-2 items-center" style={sidebarStyles.border}>
        <button 
          onClick={onLoadHistory} 
          className="flex-1 py-2 rounded text-sm border" 
          style={{ backgroundColor: 'rgb(30,30,30)', color: '#f1f1f1', borderColor: '#3e3e42' }}
        >
          <FiRefreshCw className={loadingHistory ? 'animate-spin inline mr-1' : 'inline mr-1'} /> Refresh
        </button>
        <button 
          onClick={onClearHistory} 
          disabled={!history.length} 
          className="flex-1 py-2 rounded text-sm" 
          style={{ backgroundColor: 'rgba(255,0,0,0.15)', color: '#ff5555', border: '1px solid #8b0000' }}
        >
          <FiTrash2 size={14} className="inline mr-1" />Clear
        </button>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto text-sm">
        {!filteredHistory.length ? (
          <p className="p-4 text-gray-400 text-center text-xs">
            {searchQuery ? 'No history found' : 'No history'}
          </p>
        ) : (
          <div>
            {Object.entries(groupHistoryByDate(filteredHistory)).map(([date, items]) => (
              <div key={date}>
                <div 
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider sticky top-0 z-10" 
                  style={{ backgroundColor: '#262626', color: '#858585', borderBottom: '1px solid #34373c' }}
                >
                  {date}
                </div>
                {items.map((h) => (
                  <div 
                    key={h.id} 
                    className="px-4 py-2 hover:bg-[#2f2f2f] cursor-pointer border-b" 
                    style={{ borderColor: '#2c2c2c' }} 
                    onClick={() => onLoadRequest(h)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs" style={{ color: getMethodColor(h.method) }}>
                        {h.method}
                      </span>
                      <span className="text-gray-300 text-xs truncate flex-1">{h.url}</span>
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">{formatTime(h.created_at)}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
