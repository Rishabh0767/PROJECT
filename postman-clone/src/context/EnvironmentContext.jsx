import { createContext, useState, useContext, useEffect } from 'react';

const EnvironmentContext = createContext(null);

export const EnvironmentProvider = ({ children }) => {
  const [environments, setEnvironments] = useState(() => {
    // Load from localStorage or default empty
    const saved = localStorage.getItem('postman_environments');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeEnvironment, setActiveEnvironment] = useState(() => {
    const savedActive = localStorage.getItem('postman_active_environment');
    return savedActive ? JSON.parse(savedActive) : null;
  });

  useEffect(() => {
    localStorage.setItem('postman_environments', JSON.stringify(environments));
  }, [environments]);

  useEffect(() => {
    localStorage.setItem('postman_active_environment', JSON.stringify(activeEnvironment));
  }, [activeEnvironment]);

  const addEnvironment = (env) => {
    setEnvironments(prev => [...prev, env]);
  };

  const updateEnvironment = (id, updates) => {
    setEnvironments(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEnvironment = (id) => {
    setEnvironments(prev => prev.filter(e => e.id !== id));
    if (activeEnvironment?.id === id) {
      setActiveEnvironment(null);
    }
  };

  return (
    <EnvironmentContext.Provider value={{
      environments,
      activeEnvironment,
      setActiveEnvironment,
      addEnvironment,
      updateEnvironment,
      deleteEnvironment
    }}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironment = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within EnvironmentProvider');
  }
  return context;
};
