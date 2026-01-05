import { useState } from 'react';
import { useTab } from '../../context/TabContext';

export default function ResponseViewer() {
  const [activeTab, setActiveTab] = useState('body');
  const { activeTab: currentTab } = useTab();
  
  // Get response and loading from the active tab
  const response = currentTab?.response;
  const loading = currentTab?.loading || false;

  const tabs = [
    { id: 'body', label: 'Body' },
    { id: 'headers', label: 'Headers' },
    { id: 'cookies', label: 'Cookies' }
  ];

  const formatJSON = (data) => {
    try {
      return JSON.stringify(JSON.parse(data), null, 2);
    } catch {
      return data;
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    if (!status) return 'text-dark-text-secondary';
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 300 && status < 400) return 'text-blue-400';
    if (status >= 400 && status < 500) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      200: 'OK',
      201: 'Created',
      204: 'No Content',
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable'
    };
    return statusTexts[status] || 'Unknown';
  };

  return (
    <div className="h-full flex flex-col bg-dark-bg">
      {/* Response Info Bar */}
      <div className="px-4 py-2 bg-dark-bg flex items-center justify-between flex-shrink-0 border-b border-dark-border">
        {response ? (
          <>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-dark-text-secondary">Status:</span>
                <span className={`text-xs font-bold ${getStatusColor(response.status)}`}>
                  {response.status} {getStatusText(response.status)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-dark-text-secondary">Time:</span>
                <span className="text-xs text-dark-text font-medium">{response.time}ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-dark-text-secondary">Size:</span>
                <span className="text-xs text-dark-text font-medium">{formatSize(response.size)}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-xs text-dark-text-secondary">
            {loading ? 'Loading...' : 'No response yet'}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex px-4 bg-dark-bg flex-shrink-0 h-10 ">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              activeTab === tab.id
                ? 'text-white border-orange-500'
                : 'text-dark-text-secondary hover:text-dark-text border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 bg-dark-bg">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm text-dark-text-secondary">Sending request...</span>
            </div>
          </div>
        ) : !response ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-dark-text-secondary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p className="text-dark-text-secondary text-sm">Send a request to see the response</p>
            </div>
          </div>
        ) : (
          <>
            {/* Body Tab */}
            {activeTab === 'body' && (
              <div className="space-y-3">
                {response.data ? (
                  <div className="bg-dark-bg border border-dark-border rounded overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-dark-border bg-dark-hover">
                      <span className="text-xs font-medium text-dark-text">Response Body</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            typeof response.data === 'string' 
                              ? response.data 
                              : JSON.stringify(response.data, null, 2)
                          );
                        }}
                        className="text-xs text-primary hover:text-primary-light transition"
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs text-dark-text font-mono bg-dark-bg">
                      {typeof response.data === 'string'
                        ? response.data
                        : formatJSON(JSON.stringify(response.data))}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-8 text-dark-text-secondary text-sm">
                    Empty response body
                  </div>
                )}
              </div>
            )}

            {/* Headers Tab */}
            {activeTab === 'headers' && (
              <div className="space-y-3">
                {response.headers && Object.keys(response.headers).length > 0 ? (
                  <div className="bg-dark-bg border border-dark-border rounded overflow-hidden">
                    <div className="px-3 py-2 border-b border-dark-border bg-dark-hover">
                      <span className="text-xs font-medium text-dark-text">Response Headers</span>
                    </div>
                    <div className="divide-y divide-dark-border">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="px-3 py-2 flex items-start gap-3 hover:bg-dark-hover transition">
                          <span className="text-xs font-medium text-primary min-w-[200px]">{key}</span>
                          <span className="text-xs text-dark-text font-mono flex-1 break-all">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-dark-text-secondary text-sm">
                    No headers in response
                  </div>
                )}
              </div>
            )}

            {/* Cookies Tab */}
            {activeTab === 'cookies' && (
              <div className="space-y-3">
                {response.cookies && response.cookies.length > 0 ? (
                  <div className="bg-dark-bg border border-dark-border rounded overflow-hidden">
                    <div className="px-3 py-2 border-b border-dark-border bg-dark-hover">
                      <span className="text-xs font-medium text-dark-text">Cookies</span>
                    </div>
                    <div className="divide-y divide-dark-border">
                      {response.cookies.map((cookie, idx) => (
                        <div key={idx} className="px-3 py-2 hover:bg-dark-hover transition">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-primary">{cookie.name}</span>
                            <span className="text-xs text-dark-text-secondary">·</span>
                            <span className="text-xs text-dark-text-secondary">{cookie.domain}</span>
                          </div>
                          <div className="text-xs text-dark-text font-mono">{cookie.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-dark-text-secondary text-sm">
                    No cookies in response
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
