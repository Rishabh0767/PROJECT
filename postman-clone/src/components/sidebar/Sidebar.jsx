import { useState, useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useTab } from '../../context/TabContext';
import { useEnvironment } from '../../context/EnvironmentContext';
import { collectionService } from '../../services/collectionService';
import { requestService } from '../../services/requestService';
import api from '../../services/api';
import { toast } from 'react-toastify';
import SidebarCollections from './SidebarCollections';
import SidebarHistory from './SidebarHistory';
import SidebarEnvironments from './SidebarEnvironments';
import { sidebarStyles } from './styles';

export default function Sidebar({ activeNav, isCollapsed }) {
  // State Management
  const [collections, setCollections] = useState([]);
  const [expandedCollections, setExpandedCollections] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [newEnvName, setNewEnvName] = useState('');
  const [newEnvKey, setNewEnvKey] = useState('');
  const [newEnvValue, setNewEnvValue] = useState('');

  // Contexts
  const { activeWorkspace } = useWorkspace();
  const { updateTab, activeTabId } = useTab();
  const { environments, activeEnvironment, setActiveEnvironment, addEnvironment, deleteEnvironment, updateEnvironment } = useEnvironment();

  // Effects
  useEffect(() => {
    if (activeWorkspace?.id && activeNav === 'collections') loadCollections();
  }, [activeWorkspace, activeNav]);

  useEffect(() => {
    if (activeNav === 'history') loadHistory();
  }, [activeNav]);

  // Collections Functions
  const loadCollections = async () => {
    try {
      const data = await collectionService.getByWorkspace(activeWorkspace.id);
      const collectionsWithRequests = await Promise.all(
        data.map(async (collection) => {
          try {
            const requests = await requestService.getByCollection(collection.id);
            return { ...collection, requests };
          } catch {
            return { ...collection, requests: [] };
          }
        })
      );
      setCollections(collectionsWithRequests);
    } catch {
      setCollections([]);
    }
  };

  const handleDeleteCollection = async (id) => {
    if (window.confirm('Delete this collection?')) {
      try {
        await collectionService.delete(id);
        toast.success('Collection deleted');
        loadCollections();
      } catch {
        toast.error('Failed to delete collection');
      }
    }
  };

  const handleRequestClick = async (request) => {
    try {
      const headers = request.headers ? JSON.parse(request.headers) : [];
      const params = request.params ? JSON.parse(request.params) : [];
      
      if (activeTabId) {
        updateTab(activeTabId, {
          method: request.method,
          url: request.url,
          headers: headers,
          params: params,
          body: request.body || '',
          bodyType: request.bodyType || 'json',
          name: request.name || 'Untitled Request',
          response: null,
          loading: false
        });
        toast.success('Request loaded from collection!');
      }
    } catch (error) {
      toast.error('Failed to load request');
    }
  };

  // History Functions
  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await api.get('/api/history');
      setHistory(response.data);
    } catch {
      toast.error('Failed to load history');
    } finally {
      setLoadingHistory(false);
    }
  };

  const clearHistory = async () => {
    if (window.confirm('Clear all history?')) {
      try {
        await api.delete('/api/history');
        setHistory([]);
        toast.success('History cleared');
      } catch {
        toast.error('Failed to clear history');
      }
    }
  };

  const loadHistoryRequest = (item) => {
    if (activeTabId) {
      updateTab(activeTabId, {
        method: item.method,
        url: item.url,
        headers: [],
        params: [],
        body: '',
        bodyType: 'json',
        name: `${item.method} Request`,
        response: null,
        loading: false
      });
      toast.success('Request loaded from history!');
    }
  };

  // Environment Functions
  const handleAddEnvironment = (name) => {
    if (!name.trim()) return toast.error('Enter environment name');
    const env = { id: Date.now(), name: name.trim(), variables: {} };
    addEnvironment(env);
    setActiveEnvironment(env);
    setNewEnvName('');
    toast.success('Environment created');
  };

  const handleUpdateVariable = (key, value) => {
    const updated = { 
      ...activeEnvironment, 
      variables: { 
        ...activeEnvironment.variables, 
        [key]: value 
      } 
    };
    updateEnvironment(activeEnvironment.id, updated);
    setActiveEnvironment(updated);
  };

  const handleDeleteVariable = (key) => {
    const remaining = Object.fromEntries(Object.entries(activeEnvironment.variables).filter(([k]) => k !== key));
    const updated = { ...activeEnvironment, variables: remaining };
    updateEnvironment(activeEnvironment.id, updated);
    setActiveEnvironment(updated);
  };

  // Collapsed State
  if (isCollapsed) {
    return (
      <div className="w-12 h-full flex flex-col items-center py-4 gap-4" style={sidebarStyles.container}>
        {/* Collapsed icons here */}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col" style={sidebarStyles.container}>
      {activeNav === 'collections' && (
        <SidebarCollections
          collections={collections}
          expandedCollections={expandedCollections}
          onToggleCollection={(id) => {
            const next = new Set(expandedCollections);
            next.has(id) ? next.delete(id) : next.add(id);
            setExpandedCollections(next);
          }}
          onDeleteCollection={handleDeleteCollection}
          onRequestClick={handleRequestClick}
          onLoadCollections={loadCollections}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeWorkspace={activeWorkspace}
        />
      )}

      {activeNav === 'history' && (
        <SidebarHistory
          history={history}
          loadingHistory={loadingHistory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLoadHistory={loadHistory}
          onClearHistory={clearHistory}
          onLoadRequest={loadHistoryRequest}
        />
      )}

      {activeNav === 'environment' && (
        <SidebarEnvironments
          environments={environments}
          activeEnvironment={activeEnvironment}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSetActiveEnvironment={setActiveEnvironment}
          onAddEnvironment={handleAddEnvironment}
          onDeleteEnvironment={deleteEnvironment}
          onUpdateVariable={handleUpdateVariable}
          onDeleteVariable={handleDeleteVariable}
          newEnvName={newEnvName}
          setNewEnvName={setNewEnvName}
          newEnvKey={newEnvKey}
          setNewEnvKey={setNewEnvKey}
          newEnvValue={newEnvValue}
          setNewEnvValue={setNewEnvValue}
        />
      )}
    </div>
  );
}
