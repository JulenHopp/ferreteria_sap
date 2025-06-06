import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Auth interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    // Error handling interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('rol_id');
          window.location.replace('/ferreteria_sap/login');
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string) {
    const { data } = await this.client.get<T>(url);
    return data;
  }

  async post<T>(url: string, data?: any) {
    const { data: responseData } = await this.client.post<T>(url, data);
    return responseData;
  }

  async put<T>(url: string, data?: any) {
    const { data: responseData } = await this.client.put<T>(url, data);
    return responseData;
  }

  async delete<T>(url: string) {
    const { data } = await this.client.delete<T>(url);
    return data;
  }
}

export const apiClient = new ApiClient(); 