export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// Auth types
export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  rol_id: number;
}

// export interface User {
//   id: number;
//   email: string;
//   name: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// }
