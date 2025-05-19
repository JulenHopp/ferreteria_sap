import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Button
} from "@ui5/webcomponents-react";

export default function Usuarios() {
  const [filtro, setFiltro] = useState("");

  const columns = [
    {
      Header: "Número de usuario",
      accessor: "id"
    },
    {
      Header: "Nombre usuario",
      accessor: "nombre"
    },
    {
      Header: "Correo",
      accessor: "correo"
    },
    {
      Header: "Rol",
      accessor: "rol"
    },
    {
      Header: "Editar",
      accessor: "editar",
      Cell: () => <Button>Editar</Button>  // <- botón en cada fila
    }
  ];

  const data = [
    { id: "001", nombre: "Rodrigo Kalionchiz", correo: "rodrigok@fjulen.com.mx", rol: "Dueño" },
    { id: "002", nombre: "Eugenio Garza", correo: "eugeniog@fjulen.com.mx", rol: "Almacenador" },
    { id: "003", nombre: "Julen Hernandez", correo: "julenh@fjulen.com.mx", rol: "Almacenador" },
    { id: "004", nombre: "Adolfo Gonzalez", correo: "adolfofg@fjulen.com.mx", rol: "Almacenador" },
    { id: "005", nombre: "Marcelo Cardenas", correo: "marceloc@fjulen.com.mx", rol: "Comprador" },
    { id: "006", nombre: "Danny Wu", correo: "dannyw@fjulen.com.mx", rol: "Comprador" },
    { id: "007", nombre: "Ricardo Chapa", correo: "ricardoc@fjulen.com.mx", rol: "Almacenador" },
    { id: "008", nombre: "Guillermo Montemayor", correo: "guillermom@fjulen.com.mx", rol: "Comprador" },
    { id: "009", nombre: "Adrian Guereque", correo: "adriang@fjulen.com.mx", rol: "Comprador" },
    { id: "010", nombre: "David Mireles", correo: "davidm@fjulen.com.mx", rol: "Comprador" },
    { id: "011", nombre: "Emilio Vidal", correo: "emiliov@fjulen.com.mx", rol: "Comprador" },
    { id: "012", nombre: "Alejandro Charles", correo: "alejandrodc@fjulen.com.mx", rol: "Comprador" },
    { id: "013", nombre: "Mauricio Noriega", correo: "mauricion@fjulen.com.mx", rol: "Comprador" },
    { id: "014", nombre: "Hugo Lozano", correo: "hugol@fjulen.com.mx", rol: "Comprador" },
    { id: "015", nombre: "Alejandro Perea", correo: "alejandrop@fjulen.com.mx", rol: "Comprador" }
  ];

  const dataFiltrada = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(filtro.trim().toLowerCase())
  );

  return (
    <div style={{ width: "100%"}}>
      {/* Filtros */}
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        gap: "1rem"
      }}>
        <Input
          placeholder="Escribe nombre"
          value={filtro}
          onInput={(e) => setFiltro(((e.target as unknown) as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Button>Agregar usuario</Button>
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
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />
    </div>
  );
}
