import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Types
export interface InventoryItem {
  ID: number;
  PRODUCTO_ID: number;
  NOMBRE_PRODUCTO: string;
  CATEGORIA: string;
  CATEGORIA_ID: number;
  CANTIDAD: number;
  DESCRIPCION: string;
  UBICACION: string;
  PRECIO_UNITARIO: string;
}

export interface UpdateInventoryRequest {
  inventario_id: number;
  producto_id: number;
  nombre: string;
  categoria_id: number;
  cantidad: number;
  descripcion: string;
  ubicacion: string;
  precio_unitario: number;
}

export class InventoryService {
  static async getAllInventory(): Promise<InventoryItem[]> {
    console.log('Fetching inventory from:', API_ENDPOINTS.inventory.all_inventory);
    try {
      const response = await apiClient.get<InventoryItem[]>(API_ENDPOINTS.inventory.all_inventory);
      console.log('Inventory response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching inventory:', error);
      throw error;
    }
  }

  static async updateInventory(item: InventoryItem): Promise<InventoryItem> {
    const updateData: UpdateInventoryRequest = {
      inventario_id: item.ID,
      producto_id: item.PRODUCTO_ID,
      nombre: item.NOMBRE_PRODUCTO,
      categoria_id: item.CATEGORIA_ID,
      cantidad: item.CANTIDAD,
      descripcion: item.DESCRIPCION,
      ubicacion: item.UBICACION,
      precio_unitario: parseFloat(item.PRECIO_UNITARIO)
    };

    console.log('Updating inventory with data:', updateData);
    try {
      const response = await apiClient.put<InventoryItem>(API_ENDPOINTS.inventory.update, updateData);
      console.log('Update response:', response);
      return response;
    } catch (error) {
      console.error('Error updating inventory:', error);
      throw error;
    }
  }
}