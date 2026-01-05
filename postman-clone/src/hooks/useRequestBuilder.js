import { useState, useEffect } from 'react';
import { useTab } from '../context/TabContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { useEnvironment } from '../context/EnvironmentContext';
import { collectionService } from '../services/collectionService';
import { historyService } from '../services/historyService';
import { toast } from 'react-toastify';

// Helper functions for environment variable replacement
const replaceEnvironmentVariables = (text, variables = {}) => {
  if (!text || typeof text !== 'string') return text;
  if (!variables || Object.keys(variables).length === 0) return text;

  let result = text;
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, value);
  });

  return result;
};

export const useRequestBuilder = () => {
  const { tabs, activeTabId, activeTab, updateTab, addTab: addTabContext, closeTab: closeTabContext, switchTab } = useTab();
  const { activeWorkspace } = useWorkspace();
  const { activeEnvironment } = useEnvironment();

  const [activeConfigTab, setActiveConfigTab] = useState('params');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const currentTabData = activeTab || {};

  // Load collections when workspace changes
  useEffect(() => {
    if (activeWorkspace?.id) {
      loadCollections();
    }
  }, [activeWorkspace]);

  const loadCollections = async () => {
    try {
      const data = await collectionService.getByWorkspace(activeWorkspace.id);
      setCollections(data);
      if (data.length > 0 && !selectedCollection) {
        setSelectedCollection(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load collections:', error);
    }
  };

  const handleUpdateRequest = (updates) => {
    if (activeTabId) {
      updateTab(activeTabId, updates);
    }
  };

  // ✅ MAIN SEND HANDLER WITH HISTORY SAVING
  const handleSend = async () => {
    if (!currentTabData.url.trim()) {
      toast.error('Enter a URL');
      return;
    }

    const envVars = activeEnvironment?.variables || {};
    updateTab(activeTabId, { loading: true, response: null });

    try {
      const startTime = Date.now();
      
      // Replace environment variables in URL
      let url = replaceEnvironmentVariables(currentTabData.url, envVars);

      // Build config
      const config = {
        method: currentTabData.method,
        headers: {},
      };

      // Add headers
      if (currentTabData.headers && Array.isArray(currentTabData.headers)) {
        currentTabData.headers.forEach(header => {
          if (header.enabled && header.key && header.value) {
            const key = replaceEnvironmentVariables(header.key, envVars);
            const value = replaceEnvironmentVariables(header.value, envVars);
            config.headers[key] = value;
          }
        });
      }

      // Add auth
      if (currentTabData.auth?.type === 'bearer' && currentTabData.auth.token) {
        const token = replaceEnvironmentVariables(currentTabData.auth.token, envVars);
        config.headers['Authorization'] = `Bearer ${token}`;
      } else if (currentTabData.auth?.type === 'basic' && currentTabData.auth.username && currentTabData.auth.password) {
        const username = replaceEnvironmentVariables(currentTabData.auth.username, envVars);
        const password = replaceEnvironmentVariables(currentTabData.auth.password, envVars);
        config.headers['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;
      }

      // Add body
      if (currentTabData.method !== 'GET' && currentTabData.method !== 'HEAD') {
        if (currentTabData.bodyType === 'json' && currentTabData.body) {
          config.headers['Content-Type'] = 'application/json';
          config.body = replaceEnvironmentVariables(currentTabData.body, envVars);
        } else if (currentTabData.bodyType === 'form' && currentTabData.formData) {
          const formData = new FormData();
          currentTabData.formData.forEach(item => {
            if (item.enabled && item.key && item.value) {
              const key = replaceEnvironmentVariables(item.key, envVars);
              const value = replaceEnvironmentVariables(item.value, envVars);
              formData.append(key, value);
            }
          });
          config.body = formData;
        } else if (currentTabData.bodyType === 'raw' && currentTabData.body) {
          config.body = replaceEnvironmentVariables(currentTabData.body, envVars);
        }
      }

      // Add params to URL
      if (currentTabData.params && currentTabData.params.length > 0) {
        const params = new URLSearchParams();
        currentTabData.params.forEach(param => {
          if (param.enabled && param.key && param.value) {
            const key = replaceEnvironmentVariables(param.key, envVars);
            const value = replaceEnvironmentVariables(param.value, envVars);
            params.append(key, value);
          }
        });
        const paramString = params.toString();
        if (paramString) {
          url += (url.includes('?') ? '&' : '?') + paramString;
        }
      }

      // Make request
      const response = await fetch(url, config);
      const endTime = Date.now();

      // Parse response
      const contentType = response.headers.get('content-type');
      let responseData;

      if (contentType && contentType.includes('application/json')) {
        const responseText = await response.text();
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = responseText;
        }
      } else {
        responseData = await response.text();
      }

      const responseSize = new Blob([typeof responseData === 'string' ? responseData : JSON.stringify(responseData)]).size;

      // Store response
      const responseObj = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        data: responseData,
        time: endTime - startTime,
        size: responseSize,
      };

      updateTab(activeTabId, { 
        loading: false, 
        response: responseObj 
      });

      toast.success(`${response.status} ${response.statusText}`);

      // ✅ SAVE TO HISTORY
      try {
        console.log('💾 Saving to history:', {
          method: currentTabData.method,
          url: currentTabData.url
        });
        
        await historyService.add(
          currentTabData.method,
          currentTabData.url,
          response.status,
          endTime - startTime
        );
        
        console.log('✅ History saved successfully');
      } catch (historyError) {
        console.warn('⚠️ Failed to save history:', historyError);
        // Don't fail the request if history saving fails
      }

    } catch (error) {
      console.error('❌ Request failed:', error);

      updateTab(activeTabId, { 
        loading: false, 
        response: {
          status: 0,
          statusText: 'Network Error',
          headers: {},
          data: { error: error.message },
          time: 0,
          size: 0,
        }
      });

      toast.error('Failed to send request: ' + error.message);
    }
  };

  const handleSaveRequest = async (collectionId) => {
    try {
      const requestData = {
        collection_id: collectionId,
        method: currentTabData.method,
        url: currentTabData.url,
        headers: JSON.stringify(currentTabData.headers || []),
        params: JSON.stringify(currentTabData.params || []),
        body: currentTabData.body,
        bodyType: currentTabData.bodyType,
        name: currentTabData.name,
      };

      await collectionService.saveRequest(requestData);
      toast.success('Request saved to collection!');
      setShowSaveModal(false);
    } catch (error) {
      toast.error('Failed to save request');
    }
  };

  const handleCreateAndSave = async () => {
    if (!newCollectionName.trim()) {
      toast.error('Enter collection name');
      return;
    }

    try {
      const newCollection = await collectionService.create(newCollectionName, activeWorkspace.id);
      await handleSaveRequest(newCollection.id);
      setNewCollectionName('');
      setIsCreatingNew(false);
    } catch (error) {
      toast.error('Failed to create collection');
    }
  };

  return {
    // State
    activeConfigTab,
    setActiveConfigTab,
    showSaveModal,
    setShowSaveModal,
    collections,
    selectedCollection,
    setSelectedCollection,
    newCollectionName,
    setNewCollectionName,
    isCreatingNew,
    setIsCreatingNew,
    currentTabData,

    // Tab actions
    tabs,
    activeTabId,
    addTab: addTabContext,
    closeTab: closeTabContext,
    switchTab,

    // Request actions
    handleUpdateRequest,
    handleSend,
    handleSaveRequest,
    handleCreateAndSave,

    // Workspace
    activeWorkspace
  };
};
