import { useState, useEffect } from "react";
import { OrderService, Order } from "../../services/api/order.service";
import OrdersTable from "../tables/OrdersTable";
import OrdersAnalytics from "../analytics/OrdersAnalytics";

export default function OrdersTab() {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await OrderService.getAllOrders();
      setData(ordersData);
      setError(null);
    } catch (err) {
      setError("Error al cargar las órdenes");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      // Map status string to estado_id
      const estadoIdMap: { [key: string]: number } = {
        'Aprobada': 1,
        'En Curso': 2,
        'Finalizada': 3
      };

      const estadoId = estadoIdMap[newStatus];
      if (!estadoId) {
        throw new Error('Estado inválido');
      }

      await OrderService.updateOrderStatus(orderId, estadoId);
      await fetchOrders(); // Refresh data after update
    } catch (err) {
      console.error("Error updating order status:", err);
      setError("Error al actualizar el estado de la orden");
      throw err;
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      gap: '1.5rem', 
      height: '100%',
      width: '100%'
    }}>
      <div style={{ flex: '1 1 30%' }}>
        <OrdersAnalytics data={data} />
      </div>
      <div style={{ flex: '1 1 70%' }}>
        <OrdersTable 
          data={data}
          loading={loading}
          error={error}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}
