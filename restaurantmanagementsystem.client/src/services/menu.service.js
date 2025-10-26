import axiosInstance from './axios';
import { API_ENDPOINTS } from '../config/api.config';

const menuService = {
  // Get all menu items
  getAllMenuItems: async (availableOnly = false) => {
    const url = availableOnly 
  ? `${API_ENDPOINTS.MENU_ITEMS}?availableOnly=true`
      : API_ENDPOINTS.MENU_ITEMS;
    const response = await axiosInstance.get(url);
    return response.data;
  },

  // Get menu items by category
  getMenuItemsByCategory: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENU_ITEMS_BY_CATEGORY);
    return response.data;
  },

  // Get menu item by ID
  getMenuItemById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.MENU_ITEMS_BY_ID(id));
    return response.data;
  },

  // Create menu item (Admin only)
  createMenuItem: async (menuItem) => {
    const response = await axiosInstance.post(API_ENDPOINTS.MENU_ITEMS, menuItem);
    return response.data;
  },

  // Update menu item (Admin only)
  updateMenuItem: async (id, menuItem) => {
    const response = await axiosInstance.put(API_ENDPOINTS.MENU_ITEMS_BY_ID(id), menuItem);
    return response.data;
  },

  // Delete menu item (Admin only)
  deleteMenuItem: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.MENU_ITEMS_BY_ID(id));
    return response.data;
  },
};

export default menuService;
