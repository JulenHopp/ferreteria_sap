import { 
  AnalyticalTable,
  Button,
  FlexBox
} from '@ui5/webcomponents-react';
import { useMemo } from 'react';
import { Card, Title } from '@ui5/webcomponents-react';

export interface Sugerencia {
  id: number;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
}

interface SugerenciasTableProps {
  sugerencias: Sugerencia[];
  onAceptar: (sugerencia: Sugerencia) => void;
  onRechazar: (sugerencia: Sugerencia) => void;
  onEditar: (sugerencia: Sugerencia) => void;
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
  button: {
    minWidth: '32px',
    padding: '0 4px'
  },
  content: {
    padding: '1rem'
  }
} as const;

export default function SugerenciasTable({ 
  sugerencias,
  onAceptar,
  onRechazar,
  onEditar
}: SugerenciasTableProps) {
  const columns = useMemo(() => [
    {
      Header: 'Producto',
      accessor: 'producto',
    },
    {
      Header: 'Cantidad',
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
      Header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }: { row: { original: Sugerencia } }) => (
        <FlexBox justifyContent="Center" gap="0.5rem">
          <Button
            icon="accept"
            design="Positive"
            onClick={() => onAceptar(row.original)}
            title="Aceptar sugerencia"
            style={STYLES.button}
          />
          <Button
            icon="decline"
            design="Negative"
            onClick={() => onRechazar(row.original)}
            title="Rechazar sugerencia"
            style={STYLES.button}
          />
          <Button
            icon="edit"
            design="Transparent"
            onClick={() => onEditar(row.original)}
            title="Editar cantidad"
            style={STYLES.button}
          />
        </FlexBox>
      )
    }
  ], [onAceptar, onRechazar, onEditar]);

  return (
    <div style={STYLES.container}>
      <Card style={STYLES.card}>
        <Title level="H3" style={STYLES.cardHeader}>Sugerencias de Compra IA</Title>
        <div style={STYLES.content}>
          <AnalyticalTable
            data={sugerencias}
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