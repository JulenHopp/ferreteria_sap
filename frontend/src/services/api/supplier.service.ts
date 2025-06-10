import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

export interface Supplier {
  ID: number;
  NOMBRE: string;
  CORREO: string;
  TELEFONO: string;
}

export class SupplierService {
  static async getAllSuppliers(): Promise<Supplier[]> {
    console.log('Fetching suppliers from:', API_ENDPOINTS.supplier.all_suppliers);
    try {
      const response = await apiClient.get<Supplier[]>(API_ENDPOINTS.supplier.all_suppliers);
      console.log('Suppliers response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching suppliers:', error);
      throw error;
    }
  }
} 