import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('kissankart_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('kissankart_token');
      localStorage.removeItem('kissankart_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getByFarmer: (farmerId) => api.get(`/products/farmer/${farmerId}`),
};

export const ordersAPI = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getByUser: (userId) => api.get(`/orders/user/${userId}`),
  getByFarmer: (farmerId) => api.get(`/orders/farmer/${farmerId}`),
};

export const farmersAPI = {
  getAll: (params) => api.get('/farmers', { params }),
  getById: (id) => api.get(`/farmers/${id}`),
  getProducts: (farmerId) => api.get(`/farmers/${farmerId}/products`),
};

export const suppliesAPI = {
  getAll: (params) => api.get('/supplies', { params }),
  getById: (id) => api.get(`/supplies/${id}`),
  order: (data) => api.post('/supplies/order', data),
};


export const insightsAPI = {
  getWeather: (location) => api.get('/insights/weather', { params: { location } }),
  getSoilData: (farmerId) => api.get(`/insights/soil/${farmerId}`),
  getCropRecommendations: (params) => api.get('/insights/crops', { params }),
};

export default api;