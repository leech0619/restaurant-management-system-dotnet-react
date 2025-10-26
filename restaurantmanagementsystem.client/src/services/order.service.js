import axiosInstance from './axios';
import { API_ENDPOINTS } from '../config/api.config';

const orderService = {
  // Get all orders (role-based)
  getAllOrders: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDERS);
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDERS_BY_ID(id));
    return response.data;
  },

  // Get orders by status (Admin/Staff only)
  getOrdersByStatus: async (status) => {
    const response = await axiosInstance.get(API_ENDPOINTS.ORDERS_BY_STATUS(status));
 return response.data;
  },

  // Create new order
  createOrder: async (orderData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.ORDERS, orderData);
    return response.data;
  },

  // Update order status (Admin/Staff only)
  updateOrderStatus: async (id, status) => {
    const response = await axiosInstance.patch(
      API_ENDPOINTS.ORDER_STATUS(id),
      { status }
    );
    return response.data;
  },

  // Delete order (Admin only)
  deleteOrder: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.ORDERS_BY_ID(id));
    return response.data;
  },
};

export default orderService;
