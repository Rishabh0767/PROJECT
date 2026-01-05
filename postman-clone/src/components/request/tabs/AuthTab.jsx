export default function AuthTab({ currentTabData, onUpdateRequest }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-dark-text mb-2">Auth Type</label>
        <select
          value={currentTabData.auth?.type || 'none'}
          onChange={(e) => onUpdateRequest({ auth: { ...currentTabData.auth, type: e.target.value, token: '', username: '', password: '' } })}
          className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="none">None</option>
          <option value="bearer">Bearer Token</option>
          <option value="basic">Basic Auth</option>
        </select>
      </div>

      {currentTabData.auth?.type === 'bearer' && (
        <div>
          <label className="block text-xs font-medium text-dark-text mb-2">Bearer Token</label>
          <input
            type="password"
            value={currentTabData.auth?.token || ''}
            onChange={(e) => onUpdateRequest({ auth: { ...currentTabData.auth, token: e.target.value } })}
            placeholder="Use {{token}} or paste token"
            className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary font-mono"
          />
          
            <p className="text-xs text-dark-text-secondary mt-2">Example: {`{{token}}`}</p>

        </div>
      )}

      {currentTabData.auth?.type === 'basic' && (
        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium text-dark-text mb-1">Username</label>
            <input
              type="text"
              value={currentTabData.auth?.username || ''}
              onChange={(e) => onUpdateRequest({ auth: { ...currentTabData.auth, username: e.target.value } })}
              placeholder="Username"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-dark-text mb-1">Password</label>
            <input
              type="password"
              value={currentTabData.auth?.password || ''}
              onChange={(e) => onUpdateRequest({ auth: { ...currentTabData.auth, password: e.target.value } })}
              placeholder="Password"
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded text-dark-text text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}
    </div>
  );
}
