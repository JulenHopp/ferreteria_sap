import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiResponse, LoginRequest, LoginResponse } from './types';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials);
      
      if (!response || !response.token || !response.rol_id) {
        throw new Error('Invalid response from server');
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  }

//   static async register(userData: Partial<User>): Promise<ApiResponse<User>> {
//     return apiClient.post<ApiResponse<User>>(API_ENDPOINTS.auth.register, userData);
//   }

//   static async logout(): Promise<ApiResponse<void>> {
//     return apiClient.post<ApiResponse<void>>(API_ENDPOINTS.auth.logout);
//   }

//   static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
//     return apiClient.post<ApiResponse<{ token: string }>>(API_ENDPOINTS.auth.refreshToken);
//   }

//   static async getCurrentUser(): Promise<ApiResponse<User>> {
//     return apiClient.get<ApiResponse<User>>(API_ENDPOINTS.users.profile);
//   }
} 