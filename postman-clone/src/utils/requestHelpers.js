export const getMethodTextColor = (method) => {
  switch(method) {
    case 'GET': return '#50e3c2';
    case 'POST': return '#fca130';
    case 'PUT': return '#61affe';
    case 'PATCH': return '#a78bfa';
    case 'DELETE': return '#f93e3e';
    default: return '#d4d4d4';
  }
};

export const buildRequestConfig = (currentTabData) => {
  const config = {
    method: currentTabData.method,
    headers: {},
  };

  // Add headers
  if (currentTabData.headers && Array.isArray(currentTabData.headers)) {
    currentTabData.headers.forEach(header => {
      if (header.enabled && header.key && header.value) {
        config.headers[header.key] = header.value;
      }
    });
  }

  return config;
};

export const buildRequestURL = (currentTabData) => {
  let url = currentTabData.url;
  if (currentTabData.params && currentTabData.params.length > 0) {
    const params = new URLSearchParams();
    currentTabData.params.forEach(param => {
      if (param.enabled && param.key && param.value) {
        params.append(param.key, param.value);
      }
    });
    const paramString = params.toString();
    if (paramString) {
      url += (url.includes('?') ? '&' : '?') + paramString;
    }
  }
  return url;
};

export const processRequestAuth = (config, currentTabData) => {
  if (currentTabData.auth?.type === 'bearer' && currentTabData.auth.token) {
    config.headers['Authorization'] = `Bearer ${currentTabData.auth.token}`;
  } else if (currentTabData.auth?.type === 'basic' && currentTabData.auth.username && currentTabData.auth.password) {
    config.headers['Authorization'] = `Basic ${btoa(`${currentTabData.auth.username}:${currentTabData.auth.password}`)}`;
  }
};

export const processRequestBody = (config, currentTabData) => {
  if (currentTabData.method !== 'GET' && currentTabData.method !== 'HEAD') {
    if (currentTabData.bodyType === 'json' && currentTabData.body) {
      config.headers['Content-Type'] = 'application/json';
      config.body = currentTabData.body;
    } else if (currentTabData.bodyType === 'form' && currentTabData.formData) {
      const formData = new FormData();
      currentTabData.formData.forEach(item => {
        if (item.enabled && item.key && item.value) {
          formData.append(item.key, item.value);
        }
      });
      config.body = formData;
    } else if (currentTabData.bodyType === 'raw' && currentTabData.body) {
      config.body = currentTabData.body;
    } else if (currentTabData.bodyType === 'graphql') {
      config.headers['Content-Type'] = 'application/json';
      const graphqlBody = {
        query: currentTabData.graphqlQuery || '',
        variables: currentTabData.graphqlVariables ? JSON.parse(currentTabData.graphqlVariables) : {}
      };
      config.body = JSON.stringify(graphqlBody);
    }
  }
};
