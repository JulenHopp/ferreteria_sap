import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Product {
  ID: number;
  NOMBRE: string;
  DESCRIPCION: string;
  PRECIO_UNITARIO: string;
  CATEGORIA_ID: number;
  PROVEEDOR_ID: number;
}

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    console.log('Fetching products from:', API_ENDPOINTS.product.all_products);
    try {
      const response = await apiClient.get<Product[]>(API_ENDPOINTS.product.all_products);
      console.log('Products response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
} 