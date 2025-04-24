import React, { useState } from "react";
import Logo from "../img/logo-ferreteriaJulen.png"
import {
  AnalyticalTable,
  Input,
  Label,
  Title,
  FlexBox,
  FlexBoxDirection,
  Button,
  Select,
  Option
} from "@ui5/webcomponents-react";

export default function Login() {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");

  const columns = [
    {
      Header: "Nombre del producto",
      accessor: "nombre"
    },
    {
      Header: "Categoría",
      accessor: "categoria"
    },
    {
      Header: "Cantidad de producto",
      accessor: "cantidad"
    },
    {
      Header: "Número de serie",
      accessor: "serie"
    }
  ];

  const data = [
    { nombre: "Martillo", categoria: "Herramienta manual", cantidad: 25, serie: "001" },
    { nombre: "Clavos", categoria: "Materiales de sujeción", cantidad: 100, serie: "002" },
    { nombre: "Llave inglesa", categoria: "Herramienta manual", cantidad: 20, serie: "003" },
    { nombre: "Destornillador", categoria: "Herramienta manual", cantidad: 32, serie: "004" },
    { nombre: "Sierra manual", categoria: "Herramienta manual", cantidad: 40, serie: "005" },
    { nombre: "Taladro electrico", categoria: "Herramientas eléctricas", cantidad: 15, serie: "006" },
    { nombre: "Cinta metrica", categoria: "Medición e iluminación", cantidad: 200, serie: "007" },
    { nombre: "Tenazas", categoria: "Herramienta manual", cantidad: 20, serie: "008" },
    { nombre: "Linterna", categoria: "Medición e iluminación", cantidad: 5, serie: "009" },
    { nombre: "Cinta metrica", categoria: "Medición e iluminación", cantidad: 200, serie: "007" },
    { nombre: "Tenazas", categoria: "Herramienta manual", cantidad: 20, serie: "008" },
    { nombre: "Martillo", categoria: "Herramienta manual", cantidad: 25, serie: "001" },
    { nombre: "Clavos", categoria: "Materiales de sujeción", cantidad: 100, serie: "002" },
    { nombre: "Llave inglesa", categoria: "Herramienta manual", cantidad: 20, serie: "003" },
    { nombre: "Destornillador", categoria: "Herramienta manual", cantidad: 32, serie: "004" },
    { nombre: "Sierra manual", categoria: "Herramienta manual", cantidad: 40, serie: "005" },
    { nombre: "Taladro electrico", categoria: "Herramientas eléctricas", cantidad: 15, serie: "006" },
    { nombre: "Martillo", categoria: "Herramienta manual", cantidad: 25, serie: "001" },
    { nombre: "Clavos", categoria: "Materiales de sujeción", cantidad: 100, serie: "002" },
    { nombre: "Llave inglesa", categoria: "Herramienta manual", cantidad: 20, serie: "003" },
    { nombre: "Destornillador", categoria: "Herramienta manual", cantidad: 32, serie: "004" },
    { nombre: "Sierra manual", categoria: "Herramienta manual", cantidad: 40, serie: "005" },
    { nombre: "Taladro electrico", categoria: "Herramientas eléctricas", cantidad: 15, serie: "006" },
    { nombre: "Linterna", categoria: "Medición e iluminación", cantidad: 5, serie: "009" }
  ];

  const dataFiltrada = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(filtro.trim().toLowerCase()) &&
      (categoria ? item.categoria === categoria : true)
  );

  return (
    <div style={{ width: "100%", minHeight: "100vh", paddingInline: "4rem", paddingTop: "2rem" }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: "150px", height: "100px", borderRadius: "50%", marginRight: "1rem" }}
          />
          <Title level="H1" style={{ fontSize: "2.5rem", margin: 0 }}>Almacenador</Title>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Button>Inventario</Button>
          <Button icon="employee">Rodrigo K.</Button>
        </div>
      </div>

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
        <Button design="Emphasized">Ajustar inventario</Button>
      </div>

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={12}
        groupBy={[]}
        scaleWidthMode="Grow"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}
