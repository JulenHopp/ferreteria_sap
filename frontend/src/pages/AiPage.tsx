import { useState } from 'react';
import {
  FlexBox,
  Card,
  Text,
  Icon,
  Title,
  Grid
} from '@ui5/webcomponents-react';
import { LineChart, PieChart } from '@ui5/webcomponents-react-charts';
import AiTable, { Sugerencia, HistorialSugerencia } from '../components/tables/AiTable';
import "@ui5/webcomponents-icons/dist/chart-table-view.js";
import "@ui5/webcomponents-icons/dist/history.js";
import "@ui5/webcomponents-icons/dist/accept.js";

interface CostoMensual extends Record<string, unknown> {
  month: string;
  costo: number;
}

interface DistribucionProveedor extends Record<string, unknown> {
  proveedor: string;
  porcentaje: number;
}

const COMMON_STYLES = {
  container: {
    width: '100%',
    padding: '1.5rem',
    gap: '1.5rem',
    maxWidth: '1600px',
    margin: '0 auto'
  },
  statsRow: {
    gap: '1.5rem',
    marginBottom: '2rem',
    width: '100%',
    justifyContent: 'space-between'
  },
  statCard: {
    flex: '1',
    maxWidth: '400px',
    background: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'
  },
  tableContainer: {
    width: '100%',
    marginBottom: '1.5rem'
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--sapList_BorderColor)',
    fontSize: '1.125rem',
    marginBottom: '1rem'
  },
  chartContainer: {
    height: '300px',
    width: '100%',
    padding: '1rem'
  },
  gridContainer: {
    width: '100%',
    gap: '1.5rem',
    flex: 1,
    minHeight: 0
  }
} as const;

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
  <div style={COMMON_STYLES.statCard}>
    <FlexBox alignItems="Center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
      <Icon 
        name={icon} 
        style={{ fontSize: '1.25rem', color: 'var(--sapInformative)' }} 
      />
      <Text style={{ 
        fontSize: '0.875rem',
        color: 'var(--sapInformative)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontWeight: '500'
      }}>
        {title}
      </Text>
    </FlexBox>
    <Text style={{ 
      fontSize: '2.25rem',
      fontWeight: '300',
      color: 'var(--sapNeutralColor)',
      margin: '0',
      lineHeight: '1'
    }}>
      {value}
    </Text>
  </div>
);

const GridCard = ({ children, title }: { children: React.ReactNode; title: string }) => (
  <Card
    style={{
      width: '100%',
      height: 'fit-content',
      padding: '0',
      overflow: 'hidden'
    }}
  >
    <Title level="H3" style={COMMON_STYLES.cardHeader}>{title}</Title>
    <div style={{ padding: '1rem' }}>
      {children}
    </div>
  </Card>
);

export default function AiPage() {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [historial, setHistorial] = useState<HistorialSugerencia[]>([]);
  const [costosMensuales, setCostosMensuales] = useState<CostoMensual[]>([]);
  const [distribucionProveedores, setDistribucionProveedores] = useState<DistribucionProveedor[]>([]);

  const totalHistorial = historial.length;
  const sugerenciasAceptadas = historial.filter(item => item.estado === 'Aceptado').length;
  const porcentajeEfectividad = totalHistorial > 0 
    ? ((sugerenciasAceptadas / totalHistorial) * 100).toFixed(1)
    : '0.0';

  const handleAceptar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Aceptado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al aceptar sugerencia:', error);
    }
  };

  const handleRechazar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      setSugerencias(prev => prev.filter(s => s.id !== sugerencia.id));
      const nuevaEntradaHistorial: HistorialSugerencia = {
        ...sugerencia,
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Rechazado'
      };
      setHistorial(prev => [nuevaEntradaHistorial, ...prev]);
    } catch (error) {
      console.error('Error al rechazar sugerencia:', error);
    }
  };

  const handleEditar = async (sugerencia: Sugerencia) => {
    try {
      // TODO: Implementar llamada al backend
      console.log('Editando sugerencia:', sugerencia);
    } catch (error) {
      console.error('Error al editar sugerencia:', error);
    }
  };

  const hasChartData = costosMensuales.length > 0 || distribucionProveedores.length > 0;

  return (
    <FlexBox direction="Column" style={COMMON_STYLES.container}>
      <FlexBox style={COMMON_STYLES.statsRow}>
        <StatCard 
          title="Precisión de predicción" 
          value={`${porcentajeEfectividad}%`}
          icon="chart-table-view"
        />
        <StatCard 
          title="Total historial" 
          value={totalHistorial.toString()}
          icon="history"
        />
        <StatCard 
          title="Sugerencias aceptadas" 
          value={sugerenciasAceptadas.toString()}
          icon="accept"
        />
      </FlexBox>

      <div style={COMMON_STYLES.tableContainer}>
        <GridCard title="Sugerencias de Compra IA">
          <AiTable
            sugerencias={sugerencias}
            historial={[]}
            onAceptar={handleAceptar}
            onRechazar={handleRechazar}
            onEditar={handleEditar}
            showHistorial={false}
          />
        </GridCard>
      </div>

      <div style={COMMON_STYLES.tableContainer}>
        <GridCard title="Historial de Sugerencias">
          <AiTable
            sugerencias={[]}
            historial={historial}
            onAceptar={handleAceptar}
            onRechazar={handleRechazar}
            onEditar={handleEditar}
            showSugerencias={false}
          />
        </GridCard>
      </div>

      {hasChartData && (
        <Grid
          defaultSpan="XL6 L6 M12 S12"
          style={COMMON_STYLES.gridContainer}
        >
          {costosMensuales.length > 0 && (
            <GridCard title="Tendencia de Costos Mensuales">
              <div style={COMMON_STYLES.chartContainer}>
                <LineChart
                  dimensions={[{ accessor: 'month' }]}
                  measures={[{ accessor: 'costo', label: 'Costo Total' }]}
                  dataset={costosMensuales}
                  chartConfig={{
                    margin: { top: 20, right: 20, bottom: 30, left: 40 }
                  }}
                />
              </div>
            </GridCard>
          )}

          {distribucionProveedores.length > 0 && (
            <GridCard title="Distribución por Proveedor">
              <div style={COMMON_STYLES.chartContainer}>
                <PieChart
                  dimension={{ accessor: 'proveedor' }}
                  measure={{ accessor: 'porcentaje' }}
                  dataset={distribucionProveedores}
                  chartConfig={{
                    legendPosition: "bottom",
                    legendHorizontalAlign: "center",
                    margin: { top: 20, right: 20, bottom: 50, left: 20 }
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            </GridCard>
          )}
        </Grid>
      )}
    </FlexBox>
  );
} 