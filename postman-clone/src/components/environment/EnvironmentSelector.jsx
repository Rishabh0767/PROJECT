import { useState } from 'react';
import { useEnvironment } from '../../context/EnvironmentContext';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function EnvironmentSelector() {
  const {
    environments,
    activeEnvironment,
    setActiveEnvironment,
    addEnvironment,
    deleteEnvironment,
  } = useEnvironment();

  const [newEnvName, setNewEnvName] = useState('');

  const handleAdd = () => {
    if (newEnvName.trim() === '') return;

    const newEnv = {
      id: Date.now(),
      name: newEnvName.trim(),
      variables: {}
    };

    addEnvironment(newEnv);
    setNewEnvName('');
  };

  return (
    <div className="flex items-center gap-2 text-xs text-dark-text pt-1 pb-1 pl-2 pr-3 border border-dark-border rounded bg-dark-surface">
      <select
        className="bg-dark-surface text-dark-text border-none outline-none focus:outline-none"
        value={activeEnvironment?.id || ''}
        onChange={e => {
          const env = environments.find(en => en.id.toString() === e.target.value);
          setActiveEnvironment(env || null);
        }}
      >
        <option value="">No Environment</option>
        {environments.map(env => (
          <option key={env.id} value={env.id}>
            {env.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Env"
        value={newEnvName}
        onChange={e => setNewEnvName(e.target.value)}
        className="bg-dark-bg border border-dark-border rounded px-2 py-1 text-dark-text focus:outline-none focus:ring-1 focus:ring-primary transition"
      />
      <button onClick={handleAdd} title="Add Environment" className="hover:text-primary rounded p-1">
        <FiPlus size={16} />
      </button>
      {activeEnvironment && (
        <button
          onClick={() => deleteEnvironment(activeEnvironment.id)}
          title="Delete Environment"
          className="hover:text-red-500 rounded p-1"
        >
          <FiTrash2 size={16} />
        </button>
      )}
    </div>
  );
}
