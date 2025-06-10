import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

// Types
export interface Order {
  ID: number;
  CANTIDAD: number;
  PRECIO_UNITARIO: string;
  COSTO_TOTAL: string;
  SUGERIDA_POR_IA: boolean;
  CREADO_EN: string;
  USUARIO_ID: number;
  NOMBRE_USUARIO: string;
  ESTADO_ID: number;
  ESTADOS: string;
  PROVEEDOR_ID: number;
  PROVEEDOR: string;
  PRODUCTO_ID: number;
  NOMBRE_PRODUCTO: string;
}

export interface UpdateOrderStatusRequest {
  estado_id: number;
}

export class OrderService {
  static async getAllOrders(): Promise<Order[]> {
    console.log('Fetching orders from:', API_ENDPOINTS.order.all_orders);
    try {
      const response = await apiClient.get<Order[]>(API_ENDPOINTS.order.all_orders);
      console.log('Orders response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  static async updateOrderStatus(orderId: number, estadoId: number): Promise<void> {
    console.log('Updating order status:', { orderId, estadoId });
    try {
      const updateData: UpdateOrderStatusRequest = { estado_id: estadoId };
      await apiClient.patch(API_ENDPOINTS.order.update_status(orderId), updateData);
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
}
