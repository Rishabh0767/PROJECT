import { useState } from 'react';
import { useRequest } from '../../context/RequestContext';

export default function ResponseBody() {
  const { response } = useRequest();
  const [viewMode, setViewMode] = useState('pretty');

  const formatJSON = (data) => {
    try {
      if (typeof data === 'string') {
        return JSON.stringify(JSON.parse(data), null, 2);
      }
      return JSON.stringify(data, null, 2);
    } catch {
      return typeof data === 'string' ? data : JSON.stringify(data);
    }
  };

  const getRawData = () => {
    return typeof response.data === 'string' 
      ? response.data 
      : JSON.stringify(response.data);
  };

  return (
    <div className="h-full flex flex-col">
      {/* View Mode Buttons */}
      <div className="px-4 py-3 border-b border-dark-border flex gap-2 bg-dark-surface">
        <button
          onClick={() => setViewMode('pretty')}
          className={`px-4 py-2 text-sm rounded font-medium transition ${
            viewMode === 'pretty'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-dark-bg text-dark-text border border-dark-border hover:bg-dark-hover'
          }`}
        >
          Pretty
        </button>
        <button
          onClick={() => setViewMode('raw')}
          className={`px-4 py-2 text-sm rounded font-medium transition ${
            viewMode === 'raw'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-dark-bg text-dark-text border border-dark-border hover:bg-dark-hover'
          }`}
        >
          Raw
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {response.error ? (
          <div className="bg-red-900 bg-opacity-20 border-2 border-red-600 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-red-400 font-semibold text-lg mb-2">Request Failed</p>
                <pre className="text-sm text-red-300 font-mono bg-red-950 bg-opacity-30 p-4 rounded overflow-auto whitespace-pre-wrap break-words">
                  {typeof response.data === 'object' 
                    ? JSON.stringify(response.data, null, 2)
                    : response.data}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <pre className={`text-sm font-mono p-6 rounded-lg overflow-auto whitespace-pre-wrap break-words ${
            viewMode === 'pretty' ? 'bg-dark-bg text-green-400' : 'bg-dark-surface text-dark-text'
          }`}>
            {viewMode === 'pretty' ? formatJSON(response.data) : getRawData()}
          </pre>
        )}
      </div>
    </div>
  );
}
