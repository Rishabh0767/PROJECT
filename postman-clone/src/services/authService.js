import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// IMPORTANT: Add token to ALL requests automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  async login(email, password) {
    console.log('🔐 Calling /api/users/login');
    const response = await api.post('/api/users/login', { email, password });
    console.log('✅ Login response:', response.data);
    
    const { token, username } = response.data;
    
    // ✅ SAVE TOKEN
    localStorage.setItem('token', token);
    
    // ✅ SAVE USER
    const user = { name: username, email };
    localStorage.setItem('user', JSON.stringify(user));
    
    console.log('✅ Token saved:', token);
    console.log('✅ User saved:', user);
    
    return { token, user };
  },

  async register(name, email, password) {
    console.log('📝 Calling /api/users/register');
    const response = await api.post('/api/users/register', { name, email, password });
    console.log('✅ Register response:', response.data);
    
    // ✅ Check if backend returns token after registration
    if (response.data.token) {
      const { token, username } = response.data;
      
      // ✅ SAVE TOKEN
      localStorage.setItem('token', token);
      
      // ✅ SAVE USER
      const user = { name: username || name, email };
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log('✅ Token saved after register:', token);
      console.log('✅ User saved after register:', user);
    }
    
    return response.data;
  },

  async getProfile() {
    const response = await api.get('/api/users/profile');
    return response.data;
  },

  logout() {
    console.log('🔒 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};
