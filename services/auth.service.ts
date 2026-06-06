import apiClient from "@/lib/api-client";
import { API_ENDPOINTS } from "@/config";
import type {
  ApiResponse, AuthTokens, User,
  LoginRequest, RegisterRequest, OtpRequest, OtpVerifyRequest,
  GoogleAuthRequest, ForgotPasswordRequest, ResetPasswordRequest,
} from "@/types";

export const authService = {
  async login(data: LoginRequest) {
    const res = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    );
    return res.data;
  },

  async register(data: RegisterRequest) {
    const res = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    );
    return res.data;
  },

  async googleLogin(data: GoogleAuthRequest) {
    const res = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      API_ENDPOINTS.AUTH.GOOGLE,
      data
    );
    return res.data;
  },

  async sendOtp(data: OtpRequest) {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.SEND_OTP,
      data
    );
    return res.data;
  },

  async verifyOtp(data: OtpVerifyRequest) {
    const res = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      data
    );
    return res.data;
  },

  async forgotPassword(data: ForgotPasswordRequest) {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data
    );
    return res.data;
  },

  async resetPassword(data: ResetPasswordRequest) {
    const res = await apiClient.post<ApiResponse<{ message: string }>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return res.data;
  },

  async logout() {
    const res = await apiClient.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT);
    return res.data;
  },

  async getMe() {
    const res = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return res.data;
  },
};
