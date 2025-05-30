import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Types
export interface InventoryItem {
  ID: number;
  NOMBRE: string;
  CATEGORIA: string;
  CATEGORIA_ID: number;
  CANTIDAD: number;
  DESCRIPCION: string;
  UBICACION: string;
  PRECIO_UNITARIO: string;
}

export class InventoryService {
  static async getAllInventory(): Promise<InventoryItem[]> {
    return apiClient.get<InventoryItem[]>(API_ENDPOINTS.inventory.all_inventory);
  }
}