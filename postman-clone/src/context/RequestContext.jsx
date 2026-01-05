import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import api from '../services/api';
import { toast } from 'react-toastify';

const RequestContext = createContext(null);

export const RequestProvider = ({ children }) => {
  const [currentRequest, setCurrentRequest] = useState({
    method: 'GET',
    url: '',
    params: [],
    headers: [],
    body: '',
    bodyType: 'json',
    auth: { type: 'none', token: '', username: '', password: '' }
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateRequest = (updates) => {
    setCurrentRequest(prev => ({ ...prev, ...updates }));
  };

  const sendRequest = async () => {
    setLoading(true);
    const startTime = Date.now();

    try {
      const config = {
        method: currentRequest.method,
        url: currentRequest.url,
        timeout: 30000
      };

      const headers = {};
      
      // Add enabled headers
      (currentRequest.headers || [])
        .filter(h => h.key && h.enabled !== false)
        .forEach(h => {
          headers[h.key] = h.value;
        });

      // Add params
      const params = {};
      (currentRequest.params || [])
        .filter(p => p.key && p.enabled !== false)
        .forEach(p => {
          params[p.key] = p.value;
        });

      if (Object.keys(params).length > 0) {
        config.params = params;
      }

      // Add body for POST/PUT/PATCH
      if (['POST', 'PUT', 'PATCH'].includes(currentRequest.method)) {
        if (currentRequest.bodyType === 'json' && currentRequest.body) {
          try {
            config.data = JSON.parse(currentRequest.body);
            headers['Content-Type'] = 'application/json';
          } catch (e) {
            toast.error('Invalid JSON in request body');
            setLoading(false);
            return;
          }
        } else if (currentRequest.body) {
          config.data = currentRequest.body;
        }
      }

      // Add Bearer Token
      if (currentRequest.auth?.type === 'bearer' && currentRequest.auth?.token) {
        console.log('✅ Adding Bearer Token:', currentRequest.auth.token.substring(0, 20) + '...');
        headers['Authorization'] = `Bearer ${currentRequest.auth.token}`;
      } 
      // Add Basic Auth
      else if (currentRequest.auth?.type === 'basic' && currentRequest.auth?.username && currentRequest.auth?.password) {
        console.log('✅ Adding Basic Auth');
        const credentials = btoa(`${currentRequest.auth.username}:${currentRequest.auth.password}`);
        headers['Authorization'] = `Basic ${credentials}`;
      }

      config.headers = headers;

      console.log('📤 Sending request:', config.method, config.url);
      console.log('📋 Headers:', headers);
      console.log('📊 Config:', config);

      const res = await axios(config);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
        data: res.data,
        time: responseTime,
        size: JSON.stringify(res.data).length,
        error: false
      });

      // Save to history
      try {
        await api.post('/api/history', {
          method: currentRequest.method,
          url: currentRequest.url,
          status_code: res.status,
          response_time: responseTime
        });
      } catch (historyError) {
        console.log('History save skipped');
      }

      toast.success(`✅ ${res.status} ${res.statusText}`);
    } catch (error) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      console.error('❌ Request Error:', error.message);
      console.error('❌ Error Details:', error);
      
      setResponse({
        status: error.response?.status || 0,
        statusText: error.response?.statusText || 'Error',
        headers: error.response?.headers || {},
        data: error.response?.data || { error: error.message },
        time: responseTime,
        error: true
      });

      // Save error to history
      try {
        await api.post('/api/history', {
          method: currentRequest.method,
          url: currentRequest.url,
          status_code: error.response?.status || 0,
          response_time: responseTime
        });
      } catch (historyError) {
        console.log('History save skipped');
      }

      toast.error(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
  };

  return (
    <RequestContext.Provider value={{
      currentRequest,
      updateRequest,
      response,
      loading,
      sendRequest,
      clearResponse
    }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  const context = useContext(RequestContext);
  if (!context) {
    throw new Error('useRequest must be used within RequestProvider');
  }
  return context;
};
