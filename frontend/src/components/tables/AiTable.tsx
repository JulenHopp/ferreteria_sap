import { useState, useMemo } from 'react';
import { 
  AnalyticalTable,
  Button,
  FlexBox,
  Icon
} from '@ui5/webcomponents-react';
import { BarChart, PieChart } from '@ui5/webcomponents-react-charts';

// Datos de prueba
const sugerenciasIA = [
  {
    id: 1,
    producto: 'Tornillos 3/8"',
    cantidad: 1000,
    costo: 150.00,
    proveedor: 'Ferretería Industrial SA'
  },
  {
    id: 2,
    producto: 'Tuercas 1/2"',
    cantidad: 500,
    costo: 75.50,
    proveedor: 'Distribuidora del Norte'
  },
  {
    id: 3,
    producto: 'Clavos 2"',
    cantidad: 2000,
    costo: 200.00,
    proveedor: 'Materiales Express'
  },
  {
    id: 4,
    producto: 'Cemento Portland',
    cantidad: 50,
    costo: 750.00,
    proveedor: 'Cementos y Concretos SA'
  },
  {
    id: 5,
    producto: 'Varilla 1/2"',
    cantidad: 80,
    costo: 520.00,
    proveedor: 'Aceros del Sur'
  },
  {
    id: 6,
    producto: 'Pintura vinílica blanca',
    cantidad: 25,
    costo: 850.00,
    proveedor: 'Pinturas Industriales'
  },
  {
    id: 7,
    producto: 'Cable eléctrico 12 AWG',
    cantidad: 500,
    costo: 1200.00,
    proveedor: 'Materiales Eléctricos SA'
  },
  {
    id: 8,
    producto: 'Tubería PVC 4"',
    cantidad: 60,
    costo: 720.00,
    proveedor: 'Plomería Total'
  },
  {
    id: 9,
    producto: 'Lámina galvanizada',
    cantidad: 40,
    costo: 960.00,
    proveedor: 'Metales y Más'
  },
  {
    id: 10,
    producto: 'Disco de corte 7"',
    cantidad: 150,
    costo: 375.00,
    proveedor: 'Herramientas Pro'
  },
  {
    id: 11,
    producto: 'Sellador acrílico',
    cantidad: 200,
    costo: 600.00,
    proveedor: 'Químicos Industriales'
  },
  {
    id: 12,
    producto: 'Malla electrosoldada',
    cantidad: 30,
    costo: 1500.00,
    proveedor: 'Aceros del Sur'
  },
];

// Historial de sugerencias
const historialSugerencias = [
  {
    id: 1,
    producto: 'Tornillos 3/8"',
    cantidad: 1000,
    costo: 150.00,
    proveedor: 'Ferretería Industrial SA',
    fecha: '2024-03-15',
    estado: 'Aceptado'
  },
  {
    id: 2,
    producto: 'Tuercas 1/2"',
    cantidad: 800,
    costo: 120.50,
    proveedor: 'Distribuidora del Norte',
    fecha: '2024-03-14',
    estado: 'Rechazado'
  },
  {
    id: 3,
    producto: 'Cemento Portland',
    cantidad: 100,
    costo: 1500.00,
    proveedor: 'Cementos y Concretos SA',
    fecha: '2024-03-14',
    estado: 'Aceptado'
  },
  {
    id: 4,
    producto: 'Cable eléctrico 12 AWG',
    cantidad: 300,
    costo: 720.00,
    proveedor: 'Materiales Eléctricos SA',
    fecha: '2024-03-13',
    estado: 'Aceptado'
  },
  {
    id: 5,
    producto: 'Pintura vinílica blanca',
    cantidad: 40,
    costo: 1360.00,
    proveedor: 'Pinturas Industriales',
    fecha: '2024-03-13',
    estado: 'Rechazado'
  },
  {
    id: 6,
    producto: 'Varilla 1/2"',
    cantidad: 120,
    costo: 780.00,
    proveedor: 'Aceros del Sur',
    fecha: '2024-03-12',
    estado: 'Aceptado'
  },
  {
    id: 7,
    producto: 'Clavos 2"',
    cantidad: 2500,
    costo: 250.00,
    proveedor: 'Materiales Express',
    fecha: '2024-03-12',
    estado: 'Aceptado'
  },
  {
    id: 8,
    producto: 'Tubería PVC 4"',
    cantidad: 45,
    costo: 540.00,
    proveedor: 'Plomería Total',
    fecha: '2024-03-11',
    estado: 'Rechazado'
  },
  {
    id: 9,
    producto: 'Tornillos 3/8"',
    cantidad: 1500,
    costo: 225.00,
    proveedor: 'Ferretería Industrial SA',
    fecha: '2024-03-11',
    estado: 'Aceptado'
  },
  {
    id: 10,
    producto: 'Lámina galvanizada',
    cantidad: 35,
    costo: 840.00,
    proveedor: 'Metales y Más',
    fecha: '2024-03-10',
    estado: 'Aceptado'
  },
  {
    id: 11,
    producto: 'Sellador acrílico',
    cantidad: 180,
    costo: 540.00,
    proveedor: 'Químicos Industriales',
    fecha: '2024-03-10',
    estado: 'Aceptado'
  },
  {
    id: 12,
    producto: 'Malla electrosoldada',
    cantidad: 25,
    costo: 1250.00,
    proveedor: 'Aceros del Sur',
    fecha: '2024-03-09',
    estado: 'Aceptado'
  },
  {
    id: 13,
    producto: 'Cable eléctrico 10 AWG',
    cantidad: 200,
    costo: 600.00,
    proveedor: 'Materiales Eléctricos SA',
    fecha: '2024-03-09',
    estado: 'Aceptado'
  },
  {
    id: 14,
    producto: 'Tuercas 3/4"',
    cantidad: 600,
    costo: 90.00,
    proveedor: 'Distribuidora del Norte',
    fecha: '2024-03-08',
    estado: 'Aceptado'
  },
  {
    id: 15,
    producto: 'Cemento Portland',
    cantidad: 75,
    costo: 1125.00,
    proveedor: 'Cementos y Concretos SA',
    fecha: '2024-03-08',
    estado: 'Aceptado'
  },
  {
    id: 16,
    producto: 'Pintura epóxica',
    cantidad: 30,
    costo: 1500.00,
    proveedor: 'Pinturas Industriales',
    fecha: '2024-03-07',
    estado: 'Aceptado'
  },
  {
    id: 17,
    producto: 'Varilla 3/8"',
    cantidad: 100,
    costo: 450.00,
    proveedor: 'Aceros del Sur',
    fecha: '2024-03-07',
    estado: 'Aceptado'
  },
  {
    id: 18,
    producto: 'Tubería PVC 2"',
    cantidad: 80,
    costo: 640.00,
    proveedor: 'Plomería Total',
    fecha: '2024-03-06',
    estado: 'Aceptado'
  },
  {
    id: 19,
    producto: 'Clavos 1.5"',
    cantidad: 3000,
    costo: 270.00,
    proveedor: 'Materiales Express',
    fecha: '2024-03-06',
    estado: 'Aceptado'
  },
  {
    id: 20,
    producto: 'Lámina acanalada',
    cantidad: 45,
    costo: 1350.00,
    proveedor: 'Metales y Más',
    fecha: '2024-03-05',
    estado: 'Aceptado'
  }
];

export default function AiTable() {
  // Handlers para las acciones
  const handleAceptar = (rowData) => {
    console.log('Aceptando sugerencia:', rowData);
    // Aquí iría la lógica para aceptar la sugerencia
  };

  const handleRechazar = (rowData) => {
    console.log('Rechazando sugerencia:', rowData);
    // Aquí iría la lógica para rechazar la sugerencia
  };

  const handleEditar = (rowData) => {
    console.log('Editando cantidad:', rowData);
    // Aquí iría la lógica para abrir el diálogo de edición
  };

  // Columnas para la tabla principal con anchos ajustados
  const columns = useMemo(() => [
    {
      Header: 'Producto',
      accessor: 'producto',
      minWidth: 120,
      width: 250
    },
    {
      Header: 'Cantidad',
      accessor: 'cantidad',
      minWidth: 70,
      width: 150,
      Cell: ({ value }) => value.toLocaleString()
    },
    {
      Header: 'Costo',
      accessor: 'costo',
      minWidth: 80,
      width: 200,
      Cell: ({ value }) => `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    },
    {
      Header: 'Proveedor',
      accessor: 'proveedor',
      minWidth: 120,
      width: 250
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
      minWidth: 90,
      width: 150,
      Cell: ({ row }) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            icon="accept"
            design="Positive"
            onClick={() => handleAceptar(row.original)}
            title="Aceptar sugerencia"
            style={{ minWidth: '28px', padding: '0 4px' }}
          />
          <Button
            icon="decline"
            design="Negative"
            onClick={() => handleRechazar(row.original)}
            title="Rechazar sugerencia"
            style={{ minWidth: '28px', padding: '0 4px' }}
          />
          <Button
            icon="edit"
            design="Transparent"
            onClick={() => handleEditar(row.original)}
            title="Editar cantidad"
            style={{ minWidth: '28px', padding: '0 4px' }}
          />
        </div>
      )
    }
  ], []);

  // Columnas para el historial con anchos ajustados
  const columnasHistorial = useMemo(() => [
    {
      Header: 'Fecha',
      accessor: 'fecha',
      minWidth: 80,
      width: 150
    },
    {
      Header: 'Producto',
      accessor: 'producto',
      minWidth: 120,
      width: 250
    },
    {
      Header: 'Cant.',
      accessor: 'cantidad',
      minWidth: 60,
      width: 100,
      Cell: ({ value }) => value.toLocaleString()
    },
    {
      Header: 'Costo',
      accessor: 'costo',
      minWidth: 80,
      width: 150,
      Cell: ({ value }) => `$${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`
    },
    {
      Header: 'Proveedor',
      accessor: 'proveedor',
      minWidth: 120,
      width: 250
    },
    {
      Header: 'Estado',
      accessor: 'estado',
      minWidth: 70,
      width: 100,
      Cell: ({ value }) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '4px',
          color: value === 'Aceptado' ? '#107e3e' : '#bb0000',
          fontSize: '0.875rem'
        }}>
          <Icon 
            name={value === 'Aceptado' ? 'accept' : 'decline'} 
            style={{ 
              color: value === 'Aceptado' ? '#107e3e' : '#bb0000',
              fontSize: '0.875rem'
            }} 
          />
          {value === 'Aceptado' ? 'Acep.' : 'Rech.'}
        </div>
      )
    }
  ], []);

  // Datos de estadísticas
  const stats = {
    prediccionesCorrectas: 98,
    totalSugerencias: 572,
    sugerenciasAceptadas: Math.round(572 * 0.98)
  };

  const commonStyles = {
    fontFamily: "var(--sapFontFamily)",
    fontSize: "0.875rem",
    color: "var(--sapTextColor)"
  };

  const statCardStyle = {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    padding: "1rem",
    width: "32%",
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
    ...commonStyles
  };

  const tableContainerStyle = {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
    height: "fit-content",
    ...commonStyles
  };

  const chartContainerStyle = {
    background: "white",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    height: "400px",
    width: "49%",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    ...commonStyles
  };

  const headerStyle = {
    ...commonStyles,
    fontSize: "var(--sapFontSize)",
    color: "var(--sapContent_LabelColor)",
    marginBottom: "0.5rem"
  };

  const valueStyle = {
    ...commonStyles,
    fontSize: "2rem",
    fontWeight: "normal",
    lineHeight: 1.2
  };

  // Datos para las gráficas
  const barChartData = [
    { name: 'Ferretería Industrial', sugerencias: 45 },
    { name: 'Materiales Express', sugerencias: 38 },
    { name: 'Aceros del Sur', sugerencias: 35 },
    { name: 'Pinturas Industriales', sugerencias: 32 },
    { name: 'Materiales Eléctricos', sugerencias: 28 }
  ];

  const pieChartData = [
    { estado: 'Aceptadas', cantidad: 561 },
    { estado: 'Rechazadas', cantidad: 11 }
  ];

  const tableStyle = {
    ...commonStyles,
    "& [data-component-name='TableColumn']": {
      fontSize: '0.875rem',
      padding: '8px'
    },
    "& [data-component-name='TableCell']": {
      fontSize: '0.875rem',
      padding: '8px'
    }
  };

  return (
    <div style={{ 
      width: "100%", 
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      ...commonStyles
    }}>
      {/* Primera fila: Cards de estadísticas */}
      <FlexBox style={{ width: "100%", gap: "2%" }}>
        {/* Card de Precisión */}
        <div style={statCardStyle}>
          <FlexBox alignItems="Center" style={{ marginBottom: "0.5rem" }}>
            <Icon name="quality-issue" style={{ color: "#0a6ed1", marginRight: "0.5rem" }} />
            <span style={headerStyle}>
              Precisión de predicciones
            </span>
          </FlexBox>
          <span style={{ ...valueStyle, color: "#0a6ed1" }}>
            {stats.prediccionesCorrectas}%
          </span>
          <span style={headerStyle}>
            de predicciones correctas
          </span>
        </div>

        {/* Card de Total Histórico */}
        <div style={statCardStyle}>
          <FlexBox alignItems="Center" style={{ marginBottom: "0.5rem" }}>
            <Icon name="list" style={{ color: "#354a5f", marginRight: "0.5rem" }} />
            <span style={headerStyle}>
              Total histórico
            </span>
          </FlexBox>
          <span style={{ ...valueStyle, color: "#354a5f" }}>
            {stats.totalSugerencias}
          </span>
          <span style={headerStyle}>
            sugerencias generadas
          </span>
        </div>

        {/* Card de Sugerencias Aceptadas */}
        <div style={statCardStyle}>
          <FlexBox alignItems="Center" style={{ marginBottom: "0.5rem" }}>
            <Icon name="accept" style={{ color: "#107e3e", marginRight: "0.5rem" }} />
            <span style={headerStyle}>
              Sugerencias aceptadas
            </span>
          </FlexBox>
          <span style={{ ...valueStyle, color: "#107e3e" }}>
            {stats.sugerenciasAceptadas}
          </span>
          <span style={headerStyle}>
            propuestas implementadas
          </span>
        </div>
      </FlexBox>

      {/* Segunda fila: Tablas */}
      <FlexBox style={{ width: "100%", gap: "2%" }}>
        {/* Tabla de Sugerencias */}
        <div style={{ ...tableContainerStyle, width: "49%" }}>
          <AnalyticalTable
            data={sugerenciasIA}
            columns={columns}
            header="Sugerencias de Compra IA"
            selectionMode="None"
            scaleWidthMode="Smart"
            visibleRows={8}
            style={{
              ...tableStyle,
              width: "100%",
              maxHeight: "calc(44px * 9 + 44px)"
            }}
          />
        </div>

        {/* Tabla de Historial */}
        <div style={{ ...tableContainerStyle, width: "49%" }}>
          <AnalyticalTable
            data={historialSugerencias}
            columns={columnasHistorial}
            header="Historial de Sugerencias"
            selectionMode="None"
            scaleWidthMode="Smart"
            visibleRows={8}
            style={{
              ...tableStyle,
              width: "100%",
              maxHeight: "calc(44px * 9 + 44px)"
            }}
          />
        </div>
      </FlexBox>

      {/* Tercera fila: Gráficas */}
      <FlexBox style={{ width: "100%", gap: "2%" }}>
        {/* Gráfica de barras */}
        <div style={chartContainerStyle}>
          <div style={headerStyle}>
            Top 5 Proveedores por Sugerencias
          </div>
          <BarChart 
            dataset={barChartData}
            dimensions={[{ accessor: 'name' }]}
            measures={[{ 
              accessor: 'sugerencias', 
              label: 'Cantidad',
              formatter: (value) => `${value} sugerencias`
            }]}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Gráfica de pastel */}
        <div style={chartContainerStyle}>
          <div style={headerStyle}>
            Distribución de Sugerencias
            <div style={{ 
              fontSize: "1.25rem", 
              marginTop: "0.5rem",
              ...commonStyles
            }}>
              {Math.round((561 / (561 + 11)) * 100)}% de aceptación
            </div>
          </div>
          <PieChart 
            dataset={pieChartData}
            dimension={{ accessor: 'estado' }}
            measure={{ 
              accessor: 'cantidad',
              formatter: (value) => `${value} sugerencias`
            }}
            style={{ width: '100%', height: '100%' }}
            chartConfig={{
              legendPosition: "bottom",
              legendHorizontalAlign: "center",
              margin: { top: 30, bottom: 30 }
            }}
          />
        </div>
      </FlexBox>
    </div>
  );
}

