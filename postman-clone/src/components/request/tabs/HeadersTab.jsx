import { FiX } from 'react-icons/fi';
import { requestStyles } from '../../../utils/requestStyles';

export default function HeadersTab({ currentTabData, onUpdateRequest }) {
  const addHeader = () => {
    const newHeaders = [...(currentTabData.headers || []), { key: '', value: '', description: '', enabled: true }];
    onUpdateRequest({ headers: newHeaders });
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...(currentTabData.headers || [])];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    onUpdateRequest({ headers: newHeaders });
  };

  const removeHeader = (index) => {
    const newHeaders = (currentTabData.headers || []).filter((_, i) => i !== index);
    onUpdateRequest({ headers: newHeaders });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-12 gap-2 px-2 pb-2 text-xs font-medium text-dark-text-secondary">
        <div className="col-span-1"></div>
        <div className="col-span-4">KEY</div>
        <div className="col-span-4">VALUE</div>
        <div className="col-span-3">DESCRIPTION</div>
      </div>
      <div className="space-y-2">
        {currentTabData.headers && currentTabData.headers.length > 0 ? (
          currentTabData.headers.map((header, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center px-2">
              <div className="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  checked={header.enabled !== false} 
                  onChange={(e) => updateHeader(idx, 'enabled', e.target.checked)} 
                  className="w-4 h-4 cursor-pointer" 
                />
              </div>
              <div className="col-span-4">
                <input 
                  type="text" 
                  placeholder="Key" 
                  value={header.key || ''} 
                  onChange={(e) => updateHeader(idx, 'key', e.target.value)} 
                  className={requestStyles.input}
                />
              </div>
              <div className="col-span-4">
                <input 
                  type="text" 
                  placeholder="Value" 
                  value={header.value || ''} 
                  onChange={(e) => updateHeader(idx, 'value', e.target.value)} 
                  className={requestStyles.input}
                />
              </div>
              <div className="col-span-2">
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={header.description || ''} 
                  onChange={(e) => updateHeader(idx, 'description', e.target.value)} 
                  className={requestStyles.input}
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  onClick={() => removeHeader(idx)} 
                  className="p-1 hover:bg-dark-hover rounded text-red-400 hover:text-red-300 transition"
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-12 gap-2 items-center px-2">
            <div className="col-span-1 flex justify-center">
              <input type="checkbox" checked onChange={() => {}} className="w-4 h-4" />
            </div>
            <div className="col-span-4">
              <input 
                type="text" 
                placeholder="Key" 
                className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
                onFocus={addHeader} 
              />
            </div>
            <div className="col-span-4">
              <input 
                type="text" 
                placeholder="Value" 
                className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
              />
            </div>
            <div className="col-span-3">
              <input 
                type="text" 
                placeholder="Description" 
                className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
              />
            </div>
          </div>
        )}
      </div>
      {currentTabData.headers && currentTabData.headers.length > 0 && (
        <div className="grid grid-cols-12 gap-2 items-center px-2 pt-2">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" checked onChange={() => {}} className="w-4 h-4" />
          </div>
          <div className="col-span-4">
            <input 
              type="text" 
              placeholder="Key" 
              className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
              onFocus={addHeader} 
            />
          </div>
          <div className="col-span-4">
            <input 
              type="text" 
              placeholder="Value" 
              className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
            />
          </div>
          <div className="col-span-3">
            <input 
              type="text" 
              placeholder="Description" 
              className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
