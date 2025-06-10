import { Card, CardHeader } from '@ui5/webcomponents-react';
import { PieChart } from '@ui5/webcomponents-react-charts';
import { InventoryItem } from '../../services/api/inventory.service';
import MetricCard from './MetricCard';

interface InventoryAnalyticsProps {
  data: InventoryItem[];
}

export default function InventoryAnalytics({ data }: InventoryAnalyticsProps) {
  const totalInventoryValue = data.reduce((total, item) => {
    const precio = Number(item.PRECIO_UNITARIO) || 0;
    const cantidad = Number(item.CANTIDAD) || 0;
    return total + precio * cantidad;
  }, 0);

  const totalInventoryUnits = data.reduce((total, item) => {
    return total + (Number(item.CANTIDAD) || 0);
  }, 0);

  const categoryData = data.reduce((acc: { [key: string]: number }, item) => {
    const category = item.CATEGORIA || 'Sin categoría';
    const cantidad = Number(item.CANTIDAD) || 0;
    acc[category] = (acc[category] || 0) + cantidad;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(([category, count]) => ({
    category,
    count
  }));

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <MetricCard
          label="Valor Total"
          value={`$${totalInventoryValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}`}
        />
        <MetricCard
          label="Unidades"
          value={totalInventoryUnits.toLocaleString()}
        />
      </div>

      <Card
        header={
          <CardHeader
            titleText="Distribución por Categoría"
          />
        }
        style={{ height: '100%' }}
      >
        <PieChart
          dataset={pieChartData}
          dimension={{ accessor: 'category' }}
          measure={{
            accessor: 'count',
          }}
          noLegend= {true}
        />
      </Card>
    </div>
  );
}
