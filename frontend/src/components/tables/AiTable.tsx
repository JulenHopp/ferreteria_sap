import { useMemo } from 'react';
import { 
  AnalyticalTable,
  Button,
  FlexBox,
  Icon
} from '@ui5/webcomponents-react';

// Interfaces
export interface Sugerencia {
  id: number;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
}

export interface HistorialSugerencia {
  id: number;
  fecha: string;
  producto: string;
  cantidad: number;
  costo: number;
  proveedor: string;
  estado: 'Aceptado' | 'Rechazado';
}

interface AiTableProps {
  sugerencias: Sugerencia[];
  historial: HistorialSugerencia[];
  onAceptar: (sugerencia: Sugerencia) => void;
  onRechazar: (sugerencia: Sugerencia) => void;
  onEditar: (sugerencia: Sugerencia) => void;
  showSugerencias?: boolean;
  showHistorial?: boolean;
}

// Estilos comunes
const STYLES = {
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
  container: {
    width: "100%",
    height: 'fit-content'
  }
} as const;

export default function AiTable({
  sugerencias,
  historial,
  onAceptar,
  onRechazar,
  onEditar,
  showSugerencias = true,
  showHistorial = true
}: AiTableProps) {

  // Columnas para la tabla de sugerencias activas
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

  // Columnas para el historial
  const columnasHistorial = useMemo(() => [
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

  const renderTable = (
    data: any[],
    columns: any[]
  ) => (
    <AnalyticalTable
      data={data}
      columns={columns}
      selectionMode="None"
      scaleWidthMode="Grow"
      visibleRows={8}
      minRows={4}
      style={STYLES.table}
      infiniteScroll={false}
    />
  );

  return (
    <FlexBox direction="Column" style={STYLES.container}>
      {showSugerencias && renderTable(sugerencias, columns)}
      {showHistorial && renderTable(historial, columnasHistorial)}
    </FlexBox>
  );
}

