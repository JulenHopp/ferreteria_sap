import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Types
export interface CreateUserRequest {
  nombre: string;
  correo: string;
  contrasena: string;
  rol_id: number;
}

export interface User {
  USUARIO_ID: number;
  NOMBRE: string;
  EMAIL: string;
  ROL_ID: number;
  ROL: string;
  FECHA_CREACION: string;
}

// Added interface for update request body
export interface UpdateUserRequest {
  nombre?: string;
  correo?: string;
  contrasena?: string;
  rol_id?: number;
}

// Added Role interface based on API structure
export interface Role {
  ID: number;
  NOMBRE: string;
}

export class UserService {
  static async createUser(userData: CreateUserRequest): Promise<User> {
    console.log('Creating user with data:', userData);
    try {
      const response = await apiClient.post<User>(API_ENDPOINTS.user.create, userData);
      console.log('Create user response:', response);
      return response;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getAllUsers(): Promise<User[]> {
    console.log('Fetching all users from:', API_ENDPOINTS.user.all_users);
    try {
      const response = await apiClient.get<User[]>(API_ENDPOINTS.user.all_users);
      console.log('Get all users response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Added getRoles method
  static async getRoles(): Promise<Role[]> {
    console.log('Fetching roles from:', API_ENDPOINTS.user.roles);
    try {
      const response = await apiClient.get<Role[]>(API_ENDPOINTS.user.roles);
      console.log('Get roles response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }

  // Added updateUser method
  static async updateUser(userId: number, updateData: UpdateUserRequest): Promise<User> {
    console.log(`Updating user ${userId} with data:`, updateData);
    try {
      const response = await apiClient.put<User>(API_ENDPOINTS.user.update(userId), updateData);
      console.log(`Update user ${userId} response:`, response);
      return response;
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
      throw error;
    }
  }

  // Added deleteUser method
  static async deleteUser(userId: number): Promise<void> {
    console.log(`Deleting user with ID: ${userId}`);
    try {
      // Assuming the DELETE endpoint returns a success status without a body
      await apiClient.delete(API_ENDPOINTS.user.delete(userId));
      console.log(`User with ID ${userId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    }
  }
}
