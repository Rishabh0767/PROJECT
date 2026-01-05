export default function BodyTab({ currentTabData, onUpdateRequest, activeTabId }) {
  return (
    <div className="space-y-1 h-full flex flex-col">
      <div className="flex items-center gap-4 px-3 py-3 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name={`bodyType-${activeTabId}`}
            value="none" 
            checked={currentTabData.bodyType === 'none'} 
            onChange={() => onUpdateRequest({ bodyType: 'none' })}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-dark-text">None</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name={`bodyType-${activeTabId}`}
            value="form" 
            checked={currentTabData.bodyType === 'form'} 
            onChange={() => onUpdateRequest({ bodyType: 'form' })}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-dark-text">form-data</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name={`bodyType-${activeTabId}`}
            value="json" 
            checked={currentTabData.bodyType === 'json'} 
            onChange={() => onUpdateRequest({ bodyType: 'json' })}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-dark-text">JSON</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name={`bodyType-${activeTabId}`}
            value="graphql" 
            checked={currentTabData.bodyType === 'graphql'} 
            onChange={() => onUpdateRequest({ bodyType: 'graphql' })}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-dark-text">GraphQL</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input 
            type="radio" 
            name={`bodyType-${activeTabId}`}
            value="raw" 
            checked={currentTabData.bodyType === 'raw'} 
            onChange={() => onUpdateRequest({ bodyType: 'raw' })}
            className="w-4 h-4"
          />
          <span className="text-xs font-medium text-dark-text">Raw</span>
        </label>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {currentTabData.bodyType === 'none' && (
          <div className="flex items-center justify-center h-full text-dark-text-secondary">
            <p className="text-sm">No body content</p>
          </div>
        )}

        {currentTabData.bodyType === 'json' && (
          <textarea 
            value={currentTabData.body || ''} 
            onChange={(e) => onUpdateRequest({ body: e.target.value })} 
            placeholder='{"key": "value"}' 
            className="flex-1 p-3 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono resize-none placeholder-dark-text-secondary" 
          />
        )}

        {currentTabData.bodyType === 'raw' && (
          <textarea 
            value={currentTabData.body || ''} 
            onChange={(e) => onUpdateRequest({ body: e.target.value })} 
            placeholder="Enter raw body..." 
            className="flex-1 p-3 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono resize-none placeholder-dark-text-secondary" 
          />
        )}

        {currentTabData.bodyType === 'graphql' && (
          <div className="flex-1 flex gap-2 overflow-hidden p-2">
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-medium text-dark-text-secondary mb-1">Query</label>
              <textarea 
                value={currentTabData.graphqlQuery || ''} 
                onChange={(e) => onUpdateRequest({ graphqlQuery: e.target.value })} 
                placeholder='query {\n  user {\n    id\n  }\n}' 
                className="flex-1 p-2 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono resize-none placeholder-dark-text-secondary" 
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-xs font-medium text-dark-text-secondary mb-1">Variables</label>
              <textarea 
                value={currentTabData.graphqlVariables || ''} 
                onChange={(e) => onUpdateRequest({ graphqlVariables: e.target.value })} 
                placeholder='{\n  "id": "123"\n}' 
                className="flex-1 p-2 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono resize-none placeholder-dark-text-secondary" 
              />
            </div>
          </div>
        )}

        {currentTabData.bodyType === 'form' && (
          <div className="text-center py-4 text-dark-text-secondary text-xs">
            Form data support coming soon
          </div>
        )}
      </div>
    </div>
  );
}
