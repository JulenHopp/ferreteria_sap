import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
  Button
} from "@ui5/webcomponents-react";

export default function InventarioEdit() {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");

  const columns = [
    {
      Header: "Nombre del producto",
      accessor: "NOMBRE"
    },
    {
      Header: "Categoría",
      accessor: "CATEGORIA"
    },
    {
      Header: "Cantidad de producto",
      accessor: "CANTIDAD"
    },
    {
      Header: "Descripción",
      accessor: "DESCRIPCION"
    },
    {
      Header: "Ubicación",
      accessor: "UBICACION"
    },
    {
      Header: "Precio",
      accessor: "PRECIO_UNITARIO"
    },
    {
      Header: "Editar",
      accessor: "editar",
      Cell: () => <Button>Editar</Button>  // <- botón en cada fila
    }
  ];

  const data = [
    {
        "ID": 1,
        "NOMBRE": "Taladro eléctrico",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 15,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega A - Estante 1",
        "PRECIO_UNITARIO": "1200.00"
    },
    {
        "ID": 2,
        "NOMBRE": "Cemento gris 50kg",
        "CATEGORIA": "Materiales de Construcción",
        "CANTIDAD": 45,
        "DESCRIPCION": "saco",
        "UBICACION": "Bodega B - Estante 3",
        "PRECIO_UNITARIO": "250.00"
    },
    {
        "ID": 3,
        "NOMBRE": "Casco de seguridad",
        "CATEGORIA": "Equipo de Seguridad",
        "CANTIDAD": 22,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega A - Estante 5",
        "PRECIO_UNITARIO": "180.00"
    },
    {
        "ID": 4,
        "NOMBRE": "Cemento gris 50kg",
        "CATEGORIA": "Materiales de Construcción",
        "CANTIDAD": 2,
        "DESCRIPCION": "saco",
        "UBICACION": "Sala A",
        "PRECIO_UNITARIO": "250.00"
    },
    {
        "ID": 5,
        "NOMBRE": "Pala para construcción",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 30,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega C - Estante 2",
        "PRECIO_UNITARIO": "450.00"
    },
    {
        "ID": 6,
        "NOMBRE": "Guantes de seguridad",
        "CATEGORIA": "Equipo de Seguridad",
        "CANTIDAD": 60,
        "DESCRIPCION": "par",
        "UBICACION": "Bodega A - Estante 7",
        "PRECIO_UNITARIO": "35.00"
    },
    {
        "ID": 7,
        "NOMBRE": "Martillo de acero",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 25,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega B - Estante 6",
        "PRECIO_UNITARIO": "350.00"
    },
    {
        "ID": 8,
        "NOMBRE": "Saco de arena 25kg",
        "CATEGORIA": "Materiales de Construcción",
        "CANTIDAD": 80,
        "DESCRIPCION": "saco",
        "UBICACION": "Bodega A - Estante 8",
        "PRECIO_UNITARIO": "100.00"
    },
    {
        "ID": 9,
        "NOMBRE": "Cinta métrica 5m",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 50,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega C - Estante 1",
        "PRECIO_UNITARIO": "150.00"
    },
    {
        "ID": 10,
        "NOMBRE": "Botas de seguridad",
        "CATEGORIA": "Equipo de Seguridad",
        "CANTIDAD": 15,
        "DESCRIPCION": "par",
        "UBICACION": "Bodega A - Estante 2",
        "PRECIO_UNITARIO": "300.00"
    },
    {
        "ID": 11,
        "NOMBRE": "Bloques de concreto",
        "CATEGORIA": "Materiales de Construcción",
        "CANTIDAD": 100,
        "DESCRIPCION": "unidad",
        "UBICACION": "Bodega B - Estante 4",
        "PRECIO_UNITARIO": "50.00"
    },
    {
        "ID": 12,
        "NOMBRE": "Escalera de aluminio 3m",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 10,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega C - Estante 5",
        "PRECIO_UNITARIO": "850.00"
    },
    {
        "ID": 13,
        "NOMBRE": "Pico para construcción",
        "CATEGORIA": "Herramientas",
        "CANTIDAD": 20,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega A - Estante 3",
        "PRECIO_UNITARIO": "600.00"
    },
    {
        "ID": 14,
        "NOMBRE": "Saco de cal 25kg",
        "CATEGORIA": "Materiales de Construcción",
        "CANTIDAD": 40,
        "DESCRIPCION": "saco",
        "UBICACION": "Sala B",
        "PRECIO_UNITARIO": "120.00"
    },
    {
        "ID": 15,
        "NOMBRE": "Lámpara de seguridad LED",
        "CATEGORIA": "Equipo de Seguridad",
        "CANTIDAD": 10,
        "DESCRIPCION": "pieza",
        "UBICACION": "Bodega B - Estante 2",
        "PRECIO_UNITARIO": "200.00"
    }
];

  const dataFiltrada = data.filter(
    (item) =>
      item.NOMBRE.toLowerCase().includes(filtro.trim().toLowerCase()) &&
      (categoria ? item.CATEGORIA === categoria : true)
  );

  return (
    <div style={{ width: "100%"}}>
      {/* Filtros */}
      <div style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <Input
          placeholder="Escribe nombre"
          value={filtro}
          onInput={(e) => setFiltro(((e.target as unknown) as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Select
          onChange={(e: any) => setCategoria(e.detail.selectedOption.value)}
          style={{ width: "200px" }}
        >
          <Option value="">Seleccionar Categoría</Option>
          <Option value="Herramienta manual">Herramienta manual</Option>
          <Option value="Materiales de sujeción">Materiales de sujeción</Option>
          <Option value="Herramientas eléctricas">Herramientas eléctricas</Option>
          <Option value="Medición e iluminación">Medición e iluminación</Option>
        </Select>
      </div>

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={16}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}
