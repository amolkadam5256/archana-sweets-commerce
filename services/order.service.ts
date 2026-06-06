import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type { ApiResponse, Order, PaginatedResponse, PaginationParams } from "@/types";

export const orderService = {
  async getOrders(params?: PaginationParams) {
    const res = await apiClient.get<PaginatedResponse<Order>>(
      API_ENDPOINTS.ORDERS.LIST,
      { params }
    );
    return res.data;
  },

  async getOrder(id: string) {
    const res = await apiClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.DETAIL(id)
    );
    return res.data;
  },

  async createOrder(data: {
    shippingAddressId: string;
    paymentMethod: string;
    couponCode?: string;
    notes?: string;
  }) {
    const res = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      data
    );
    return res.data;
  },

  async cancelOrder(id: string, reason: string) {
    const res = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CANCEL(id),
      { reason }
    );
    return res.data;
  },

  async getOrderTracking(id: string) {
    const res = await apiClient.get(API_ENDPOINTS.ORDERS.TRACKING(id));
    return res.data;
  },

  async createPaymentOrder(orderId: string) {
    const res = await apiClient.post<ApiResponse<{ razorpayOrderId: string; amount: number }>>(
      API_ENDPOINTS.PAYMENTS.CREATE_ORDER,
      { orderId }
    );
    return res.data;
  },

  async verifyPayment(data: {
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
    orderId: string;
  }) {
    const res = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.PAYMENTS.VERIFY,
      data
    );
    return res.data;
  },
};
