import React, { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Label,
  FlexBox,
  FlexBoxDirection
} from "@ui5/webcomponents-react";

const TablaEjemplo = () => {
  const [filtro, setFiltro] = useState("");

  const columns = [
    {
      Header: "Nombre",
      accessor: "nombre"
    },
    {
      Header: "Categoría",
      accessor: "categoria"
    },
    {
      Header: "Cantidad",
      accessor: "cantidad"
    },
    {
      Header: "Número de Serie",
      accessor: "serie"
    }
  ];

  const data = [
    { nombre: "Martillo", categoria: "Herramienta manual", cantidad: 25, serie: "001" },
    { nombre: "Clavos", categoria: "Materiales de sujeción", cantidad: 100, serie: "002" },
    { nombre: "Llave inglesa", categoria: "Herramienta manual", cantidad: 20, serie: "003" }
  ];

  const dataFiltrada = data.filter((item) =>
    item.nombre?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <FlexBox
      direction={FlexBoxDirection.Column}
      style={{
        padding: "2rem",
        alignItems: "flex-start",
        minHeight: "100vh"
      }}
    >
      <Label style={{ marginBottom: "0.5rem" }}>Filtrar por nombre</Label>
      <Input
        placeholder="Escribe un nombre..."
        value={filtro}
        onInput={(e: CustomEvent & { detail: { value: string } }) =>
          setFiltro(e.detail.value)
        }
        style={{ marginBottom: "1rem", width: "300px" }}
      />

      {dataFiltrada.length > 0 ? (
        <AnalyticalTable
          columns={columns}
          data={dataFiltrada}
          visibleRows={5}
          groupBy={[]}
          scaleWidthMode="Grow"
          style={{
            width: "80vw",
            maxWidth: "1200px",
            minWidth: "800px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            borderRadius: "8px"
          }}
        />
      ) : (
        <p style={{ marginTop: "1rem", fontStyle: "italic" }}>No hay resultados.</p>
      )}
    </FlexBox>
  );
};

export default TablaEjemplo;
