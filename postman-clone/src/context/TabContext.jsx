import { createContext, useContext, useState, useCallback } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
  const [tabs, setTabs] = useState(() => [{
    id: Date.now(),
    name: 'New Request',
    method: 'GET',
    url: '',
    headers: [],
    params: [],
    body: '',
    bodyType: 'json',
    formData: [],           
    graphqlQuery: '',       
    graphqlVariables: '',   
    auth: { type: 'none' }, 
    response: null,
  }]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const addTab = useCallback(() => {
    const newTab = {
      id: Date.now(),
      name: 'New Request',
      method: 'GET',
      url: '',
      headers: [],
      params: [],
      body: '',
      bodyType: 'json',
      formData: [],           
      graphqlQuery: '',       
      graphqlVariables: '',   
      auth: { type: 'none' }, 
      response: null,
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  }, []);

  const updateTab = useCallback((tabId, updates) => {
    setTabs(prev =>
      prev.map(tab =>
        tab.id === tabId ? { ...tab, ...updates } : tab
      )
    );
  }, []);

  const closeTab = useCallback((tabId) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.id !== tabId);
      
      if (activeTabId === tabId && newTabs.length > 0) {
        setActiveTabId(newTabs[0].id);
      }
      
      return newTabs;
    });
  }, [activeTabId]);

  const switchTab = useCallback((tabId) => {
    setActiveTabId(tabId);
  }, []);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <TabContext.Provider value={{ tabs, activeTabId, activeTab, addTab, updateTab, closeTab, switchTab }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within TabProvider');
  }
  return context;
}
