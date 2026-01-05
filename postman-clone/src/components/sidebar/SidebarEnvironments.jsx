import { FiSearch, FiTrash2, FiX, FiPlus } from 'react-icons/fi';
import { sidebarStyles } from './styles';
import { toast } from 'react-toastify';

export default function SidebarEnvironments({
  environments,
  activeEnvironment,
  searchQuery,
  setSearchQuery,
  onSetActiveEnvironment,
  onAddEnvironment,
  onDeleteEnvironment,
  onUpdateVariable,
  onDeleteVariable,
  newEnvName,
  setNewEnvName,
  newEnvKey,
  setNewEnvKey,
  newEnvValue,
  setNewEnvValue
}) {
  const filteredEnvironments = environments.filter(env =>
    env.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddVariable = () => {
    if (!activeEnvironment) return toast.error('Select an environment first');
    if (!newEnvKey.trim()) return toast.error('Enter variable key');
    
    onUpdateVariable(newEnvKey, newEnvValue);
    setNewEnvKey('');
    setNewEnvValue('');
  };

  const handleDeleteEnv = (envId, envName) => {
    if (window.confirm(`Delete environment "${envName}"?`)) {
      onDeleteEnvironment(envId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search & Create */}
      <div className="p-3 border-b" style={sidebarStyles.border}>
        {/* Search Bar */}
        <div className="relative mb-3">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search environments..."
            className="w-full pl-9 pr-3 py-2 rounded text-sm"
            style={sidebarStyles.input}
          />
        </div>

        {/* Environment Selector */}
        <select 
          className="w-full rounded text-sm px-3 py-2 mb-3" 
          style={{ backgroundColor: '#232323', border: '1px solid #34373c', color: '#f1f1f1' }} 
          value={activeEnvironment?.id || ''} 
          onChange={(e) => {
            const id = parseInt(e.target.value);
            const env = environments.find((v) => v.id === id);
            onSetActiveEnvironment(env || null);
          }}
        >
          <option value="">Select Environment</option>
          {filteredEnvironments.map((env) => (
            <option key={env.id} value={env.id}>{env.name}</option>
          ))}
        </select>

        {/* Create New Environment */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="New environment name" 
            value={newEnvName} 
            onChange={(e) => setNewEnvName(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && onAddEnvironment(newEnvName)} 
            style={sidebarStyles.darkInput} 
            className="flex-1 px-3 py-2 rounded text-sm" 
          />
          <button 
            className="px-3 py-2 rounded text-sm" 
            style={sidebarStyles.button}
            onClick={() => onAddEnvironment(newEnvName)}
          >
            <FiPlus />
          </button>
        </div>
      </div>

      {/* Variables Section */}
      <div className="flex-1 p-3 overflow-y-auto">
        {activeEnvironment ? (
          <div className="space-y-3">
            {/* Environment Header */}
            <div className="flex justify-between items-center pb-2 border-b" style={sidebarStyles.border}>
              <span className="text-sm text-gray-300 font-medium">{activeEnvironment.name}</span>
              <button 
                className="text-xs text-red-400 hover:text-red-300" 
                onClick={() => handleDeleteEnv(activeEnvironment.id, activeEnvironment.name)}
              >
                <FiTrash2 size={14} />
              </button>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-400 px-1">
              <div className="col-span-5">KEY</div>
              <div className="col-span-6">VALUE</div>
              <div className="col-span-1"></div>
            </div>

            {/* Existing Variables */}
            {Object.entries(activeEnvironment.variables || {}).map(([k, v]) => (
              <div key={k} className="grid grid-cols-12 gap-2 items-center">
                <input 
                  type="text" 
                  value={k} 
                  disabled 
                  className="col-span-5 px-2 py-2 text-xs rounded" 
                  style={{ backgroundColor: '#222', color: '#999', border: '1px solid #34373c' }} 
                />
                <input 
                  type="text" 
                  value={v} 
                  onChange={(e) => onUpdateVariable(k, e.target.value)} 
                  placeholder="Value"
                  className="col-span-6 px-2 py-2 text-xs rounded" 
                  style={sidebarStyles.darkInput}
                />
                <button 
                  className="col-span-1 p-2 text-red-500 hover:text-red-400 flex justify-center" 
                  onClick={() => onDeleteVariable(k)}
                  title="Delete variable"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}

            {/* Add New Variable */}
            <div className="pt-3 border-t" style={sidebarStyles.border}>
              <div className="grid grid-cols-12 gap-2 items-center mb-2">
                <input 
                  type="text" 
                  value={newEnvKey}
                  onChange={(e) => setNewEnvKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddVariable()}
                  placeholder="Key" 
                  className="col-span-5 px-2 py-2 text-xs rounded" 
                  style={sidebarStyles.darkInput}
                />
                <input 
                  type="text" 
                  value={newEnvValue}
                  onChange={(e) => setNewEnvValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddVariable()}
                  placeholder="Value" 
                  className="col-span-6 px-2 py-2 text-xs rounded" 
                  style={sidebarStyles.darkInput}
                />
                <button 
                  className="col-span-1 p-2 flex justify-center text-blue-400 hover:text-blue-300" 
                  onClick={handleAddVariable}
                  title="Add variable"
                >
                  <FiPlus size={14} />
                </button>
              </div>
            </div>

            {Object.keys(activeEnvironment.variables || {}).length === 0 && (
              <p className="text-xs text-gray-500 text-center mt-4">No variables yet. Add your first variable above.</p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center mt-8">Select or create an environment to manage variables</p>
        )}
      </div>
    </div>
  );
}
