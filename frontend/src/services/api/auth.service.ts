import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Types
export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  rol_id: number;
  user_id: number;
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.auth.login, credentials);
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