import { useState, useMemo } from 'react';
import { 
  AnalyticalTable, 
  Button,
  Input,
  FlexBox,
  FilterBar,
  FilterGroupItem,
  Title,
  ValueState
} from '@ui5/webcomponents-react';

// Datos de ejemplo
const sugerenciasIA = [
  { id: 1, producto: "Tornillos 3/8\"", cantidad: 1000, costo: 150.00, proveedor: "Ferretería Industrial SA" },
  { id: 2, producto: "Tuercas 1/2\"", cantidad: 500, costo: 75.50, proveedor: "Distribuidora del Norte" },
  { id: 3, producto: "Clavos 2\"", cantidad: 2000, costo: 200.00, proveedor: "Materiales Express" },
  { id: 4, producto: "Cemento Portland", cantidad: 50, costo: 750.00, proveedor: "Cementos y Concretos SA" },
  { id: 5, producto: "Varilla 3/8\"", cantidad: 100, costo: 450.00, proveedor: "Aceros del Sur" }
];

export default function AsistenciaIA() {
  const [filtroProducto, setFiltroProducto] = useState('');
  
  // Handlers para las acciones
  const handleAceptar = (rowData) => {
    console.log('Aceptando sugerencia:', rowData);
  };

  const handleRechazar = (rowData) => {
    console.log('Rechazando sugerencia:', rowData);
  };

  const handleEditar = (rowData) => {
    console.log('Editando cantidad:', rowData);
  };

  // Filtrado de datos
  const datosFiltrados = useMemo(() => {
    return sugerenciasIA.filter(item => 
      item.producto.toLowerCase().includes(filtroProducto.toLowerCase())
    );
  }, [filtroProducto]);

  // Definición de columnas
  const columns = [
    {
      Header: 'Producto sugerido',
      accessor: 'producto',
      width: 250
    },
    {
      Header: 'Cantidad a pedir',
      accessor: 'cantidad',
      width: 150,
      Cell: ({ value }) => value.toLocaleString()
    },
    {
      Header: 'Costo estimado',
      accessor: 'costo',
      width: 150,
      Cell: ({ value }) => `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    },
    {
      Header: 'Proveedor sugerido',
      accessor: 'proveedor',
      width: 250
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
      width: 200,
      Cell: ({ row }) => (
        <FlexBox justifyContent="Center" alignItems="Center">
          <Button
            icon="accept"
            design="Positive"
            onClick={() => handleAceptar(row.original)}
            title="Aceptar sugerencia"
          />
          <Button
            icon="decline"
            design="Negative"
            onClick={() => handleRechazar(row.original)}
            title="Rechazar sugerencia"
            style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}
          />
          <Button
            icon="edit"
            design="Transparent"
            onClick={() => handleEditar(row.original)}
            title="Editar cantidad"
          />
        </FlexBox>
      )
    }
  ];

  return (
    <div className="p-4">
      <Title level="H1">Sugerencias de Compra IA</Title>
      
      {/* Barra de filtros */}
      <FilterBar 
        style={{ 
          marginBottom: '1rem',
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}
      >
        <FilterGroupItem label="Buscar producto">
          <Input
            placeholder="Filtrar por nombre de producto..."
            value={filtroProducto}
            onChange={(e) => setFiltroProducto(e.target.value)}
            icon="search"
          />
        </FilterGroupItem>
      </FilterBar>

      {/* Tabla */}
      <AnalyticalTable
        data={datosFiltrados}
        columns={columns}
        selectionMode="None"
        scaleWidthMode="Smart"
        style={{
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }}
        rowHeight={44}
        alternateRowColor={false}
        header={null}
        visibleRows={10}
      />
    </div>
  );
} 