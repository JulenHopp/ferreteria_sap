import { 
  AnalyticalTable,
  FlexBox,
  Icon,
  Card,
  Title
} from '@ui5/webcomponents-react';
import { useMemo } from 'react';

export interface HistorialSugerencia {
  id: number;
  fecha: string;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
  estado: 'Aceptado' | 'Rechazado';
}

interface HistorialTableProps {
  historial: HistorialSugerencia[];
}

const STYLES = {
  container: {
    width: '100%',
    marginBottom: '1.5rem'
  },
  card: {
    width: '100%',
    height: 'fit-content',
    padding: '0',
    overflow: 'hidden'
  },
  cardHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--sapList_BorderColor)',
    fontSize: '1.125rem',
    marginBottom: '1rem'
  },
  table: {
    width: "100%",
    boxShadow: "var(--sapContent_Shadow0)",
    borderRadius: "var(--sapElement_BorderCornerRadius)",
    marginBottom: "0",
    height: 'fit-content'
  },
  content: {
    padding: '1rem'
  }
} as const;

export default function HistorialTable({ historial }: HistorialTableProps) {
  const columns = useMemo(() => [
    {
      Header: 'Fecha',
      accessor: 'fecha',
    },
    {
      Header: 'Producto',
      accessor: 'producto',
    },
    {
      Header: 'Cant.',
      accessor: 'cantidad',
      Cell: ({ value }: { value: number }) => value.toLocaleString()
    },
    {
      Header: 'Costo',
      accessor: 'costo',
      Cell: ({ value }: { value: number }) => `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    },
    {
      Header: 'Proveedor',
      accessor: 'proveedor',
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      Cell: ({ value }: { value: 'Aceptado' | 'Rechazado' }) => (
        <FlexBox alignItems="Center" justifyContent="Center" gap="0.25rem">
          <Icon 
            name={value === 'Aceptado' ? 'accept' : 'decline'} 
            style={{ 
              color: value === 'Aceptado' ? 'var(--sapPositiveColor)' : 'var(--sapNegativeColor)',
              fontSize: 'var(--sapFontSize)'
            }} 
          />
          {value === 'Aceptado' ? 'Acep.' : 'Rech.'}
        </FlexBox>
      )
    }
  ], []);

  return (
    <div style={STYLES.container}>
      <Card style={STYLES.card}>
        <Title level="H3" style={STYLES.cardHeader}>Historial de Sugerencias</Title>
        <div style={STYLES.content}>
          <AnalyticalTable
            data={historial}
            columns={columns}
            selectionMode="None"
            scaleWidthMode="Grow"
            visibleRows={8}
            minRows={4}
            style={STYLES.table}
            infiniteScroll={false}
          />
        </div>
      </Card>
    </div>
  );
} 