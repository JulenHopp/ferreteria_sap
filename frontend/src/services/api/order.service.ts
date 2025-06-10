import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';

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

export interface CreateOrderRequest {
  usuario_id: number;
  estado_id: number;
  proveedor_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: string;
  costo_total: string;
  sugerida_por_ia: boolean;
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

  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    console.log('Creating order:', orderData);
    try {
      const response = await apiClient.post<Order>(API_ENDPOINTS.order.create, orderData);
      console.log('Create order response:', response);
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
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
