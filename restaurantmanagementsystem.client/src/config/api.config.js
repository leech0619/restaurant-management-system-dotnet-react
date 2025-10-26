// API Configuration for Minion Cafe
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7000/api';

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    BASE: `${API_BASE_URL}/auth`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
    CREATE_ADMIN: `${API_BASE_URL}/auth/create-admin`,
  },

  // Legacy support
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,

  // Menu Items
  MENU_ITEMS: `${API_BASE_URL}/menuitems`,
  MENU_ITEMS_BY_ID: (id) => `${API_BASE_URL}/menuitems/${id}`,
  MENU_ITEMS_BY_CATEGORY: `${API_BASE_URL}/menuitems/by-category`,

  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  ORDERS_BY_ID: (id) => `${API_BASE_URL}/orders/${id}`,
  ORDERS_BY_STATUS: (status) => `${API_BASE_URL}/orders/by-status/${status}`,
  ORDER_STATUS: (id) => `${API_BASE_URL}/orders/${id}/status`,
};

export default API_BASE_URL;
