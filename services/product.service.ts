import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type { ApiResponse, PaginatedResponse, Product, ProductFilters, PaginationParams, Review } from "@/types";

export const productService = {
  async getProducts(params?: ProductFilters & PaginationParams) {
    const res = await apiClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.LIST,
      { params }
    );
    return res.data;
  },

  async getProduct(slug: string) {
    const res = await apiClient.get<ApiResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.DETAIL(slug)
    );
    return res.data;
  },

  async getFeaturedProducts() {
    const res = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.FEATURED
    );
    return res.data;
  },

  async getBestSellers() {
    const res = await apiClient.get<ApiResponse<Product[]>>(
      API_ENDPOINTS.PRODUCTS.BEST_SELLERS
    );
    return res.data;
  },

  async searchProducts(query: string, params?: PaginationParams) {
    const res = await apiClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.SEARCH,
      { params: { q: query, ...params } }
    );
    return res.data;
  },

  async getProductReviews(productId: string, params?: PaginationParams) {
    const res = await apiClient.get<PaginatedResponse<Review>>(
      API_ENDPOINTS.REVIEWS.LIST(productId),
      { params }
    );
    return res.data;
  },

  async submitReview(productId: string, data: { rating: number; title: string; comment: string }) {
    const res = await apiClient.post<ApiResponse<Review>>(
      API_ENDPOINTS.REVIEWS.CREATE(productId),
      data
    );
    return res.data;
  },
};
