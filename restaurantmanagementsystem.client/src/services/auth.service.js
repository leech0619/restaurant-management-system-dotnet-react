import axios from './axios';
import { API_ENDPOINTS } from '../config/api.config';

const authService = {
  // Login
  login: async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, {
      email,
      password,
    });
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  // Register
  register: async (userData) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        email: response.data.email,
        fullName: response.data.fullName,
        role: response.data.role,
      }));
    }
    
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'Admin';
  },

  // Check if user is staff
  isStaff: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'Staff';
  },

  // Create Admin
  createAdmin: async (userData) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.CREATE_ADMIN, userData);
    return response.data;
  },

  // Change Password
  changePassword: async (userData) => {
    const response = await axios.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, userData);
    return response.data;
  },
};

export default authService;
