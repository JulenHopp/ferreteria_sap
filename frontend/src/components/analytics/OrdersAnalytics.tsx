import { Order } from "../../services/api/order.service";
import { FlexBox } from "@ui5/webcomponents-react";
import MetricCard from "./MetricCard";

interface OrdersAnalyticsProps {
  data: Order[];
}

export default function OrdersAnalytics({ data }: OrdersAnalyticsProps) {
  const totalOrders = data.length;
  const totalCost = data.reduce((sum, order) => sum + parseFloat(order.COSTO_TOTAL), 0).toFixed(2);
  const approvedOrders = data.filter(order => order.ESTADOS === 'Aprobada').length;
  const pendingOrders = data.filter(order => order.ESTADOS === 'En Curso').length;

  return (
    <div style={{ width: "100%" }}>
      <FlexBox direction="Row" gap="1rem" justifyContent="SpaceAround">
        <MetricCard 
          label="Total de órdenes" 
          value={totalOrders.toString()} 
        />
        <MetricCard 
          label="Costo Total" 
          value={`$${Number(totalCost).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
        />
        <MetricCard 
          label="Órdenes Aprobadas" 
          value={approvedOrders.toString()} 
        />
        <MetricCard 
          label="Órdenes En Curso" 
          value={pendingOrders.toString()} 
        />
      </FlexBox>
    </div>
  );
}
