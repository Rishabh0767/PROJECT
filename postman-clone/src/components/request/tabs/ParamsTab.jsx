import { FiX } from 'react-icons/fi';
import { requestStyles } from '../../../utils/requestStyles';

export default function ParamsTab({ currentTabData, onUpdateRequest }) {
  const addParam = () => {
    const newParams = [...(currentTabData.params || []), { key: '', value: '', description: '', enabled: true }];
    onUpdateRequest({ params: newParams });
  };

  const updateParam = (index, field, value) => {
    const newParams = [...(currentTabData.params || [])];
    newParams[index] = { ...newParams[index], [field]: value };
    onUpdateRequest({ params: newParams });
  };

  const removeParam = (index) => {
    const newParams = (currentTabData.params || []).filter((_, i) => i !== index);
    onUpdateRequest({ params: newParams });
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
        {currentTabData.params && currentTabData.params.length > 0 ? (
          currentTabData.params.map((param, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-center px-2">
              <div className="col-span-1 flex justify-center">
                <input 
                  type="checkbox" 
                  checked={param.enabled !== false} 
                  onChange={(e) => updateParam(idx, 'enabled', e.target.checked)} 
                  className="w-4 h-4 cursor-pointer" 
                />
              </div>
              <div className="col-span-4">
                <input 
                  type="text" 
                  placeholder="Key" 
                  value={param.key || ''} 
                  onChange={(e) => updateParam(idx, 'key', e.target.value)} 
                  className={requestStyles.input} 
                />
              </div>
              <div className="col-span-4">
                <input 
                  type="text" 
                  placeholder="Value" 
                  value={param.value || ''} 
                  onChange={(e) => updateParam(idx, 'value', e.target.value)} 
                  className={requestStyles.input} 
                />
              </div>
              <div className="col-span-2">
                <input 
                  type="text" 
                  placeholder="Description" 
                  value={param.description || ''} 
                  onChange={(e) => updateParam(idx, 'description', e.target.value)} 
                  className={requestStyles.input} 
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <button 
                  onClick={() => removeParam(idx)} 
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
                onFocus={addParam} 
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
      {currentTabData.params && currentTabData.params.length > 0 && (
        <div className="grid grid-cols-12 gap-2 items-center px-2 pt-2">
          <div className="col-span-1 flex justify-center">
            <input type="checkbox" checked onChange={() => {}} className="w-4 h-4" />
          </div>
          <div className="col-span-4">
            <input 
              type="text" 
              placeholder="Key" 
              className="w-full px-2 py-1.5 bg-dark-bg border border-dark-border rounded text-dark-text-secondary text-xs" 
              onFocus={addParam} 
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
