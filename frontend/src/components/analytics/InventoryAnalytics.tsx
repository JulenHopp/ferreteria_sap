import { 
  Card,
  Title,
  Text,
  FlexBox
} from '@ui5/webcomponents-react';
import { PieChart } from '@ui5/webcomponents-react-charts';
import { InventoryItem } from '../../services/api/inventory.service';

interface InventoryAnalyticsProps {
  data: InventoryItem[];
}

const STYLES = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1rem'
  },
  cardContainer: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  card: {
    flex: 1,
    padding: '1.5rem',
    minWidth: '250px'
  },
  cardHeader: {
    fontSize: '0.875rem',
    color: 'var(--sapContent_LabelColor)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: '300',
    color: 'var(--sapNeutralColor)',
    margin: '0.5rem 0'
  },
  chartCard: {
    width: '100%',
    height: '400px',
    padding: '1.5rem'
  },
  chartContainer: {
    width: '100%',
    height: '100%',
    marginTop: '1rem'
  }
} as const;

export default function InventoryAnalytics({ data }: InventoryAnalyticsProps) {
  // Calcular el valor total del inventario
  const totalInventoryValue = data.reduce((total, item) => {
    const precio = Number(item.PRECIO_UNITARIO) || 0;
    const cantidad = Number(item.CANTIDAD) || 0;
    return total + (precio * cantidad);
  }, 0);

  // Calcular el total de unidades en inventario
  const totalInventoryUnits = data.reduce((total, item) => {
    return total + (Number(item.CANTIDAD) || 0);
  }, 0);

  // Preparar datos para el gráfico de categorías
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
    <div style={STYLES.container as any}>
      <FlexBox style={STYLES.cardContainer}>
        <Card style={STYLES.card}>
          <Text style={STYLES.cardHeader}>Valor Total del Inventario</Text>
          <Text style={STYLES.cardValue}>
            ${totalInventoryValue.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </Text>
        </Card>
        <Card style={STYLES.card}>
          <Text style={STYLES.cardHeader}>Total de Unidades</Text>
          <Text style={STYLES.cardValue}>
            {totalInventoryUnits.toLocaleString()}
          </Text>
        </Card>
      </FlexBox>

      <Card style={STYLES.chartCard}>
        <Title level="H3">Distribución por Categoría</Title>
        <div style={STYLES.chartContainer}>
          <PieChart
            dataset={pieChartData}
            dimension={{
              accessor: 'category'
            }}
            measure={{
              accessor: 'count',
              formatter: (value) => `${value.toLocaleString()} unidades`
            }}
            chartConfig={{
              legendPosition: 'bottom',
              legendHorizontalAlign: 'center',
              paddingAngle: 2,
              margin: { top: 20, right: 20, bottom: 70, left: 20 }
            }}
          />
        </div>
      </Card>
    </div>
  );
}
