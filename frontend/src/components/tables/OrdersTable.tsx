// frontend/src/pages/Pedidos.jsx
import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
} from "@ui5/webcomponents-react";

export default function Pedidos() {
  const [filtro, setFiltro] = useState("");
  const [estatus, setEstatus] = useState("");

  interface Pedido {
    numero: number;
    proveedor: string;
    producto: string;
    estatus: string;
  }

  const handleEstatusChange = (numero: number, newEstatus: string): void => {
    const updatedData: Pedido[] = data.map((item) =>
      item.numero === numero ? { ...item, estatus: newEstatus } : item
    );
    // Aquí puedes actualizar el estado o manejar la lógica para guardar los cambios
    console.log("Datos actualizados:", updatedData);
  };

  const columns = [
    { Header: "Número de pedido", accessor: "numero" },
    { Header: "Proveedor", accessor: "proveedor" },
    { Header: "Nombre producto", accessor: "producto" },
    {
      Header: "Estatus pedido",
      accessor: "estatus",
      Cell: ({ row }: { row: { original: Pedido } }) => (
        <Select
          value={row.original.estatus}
          onChange={(e) =>
            handleEstatusChange(row.original.numero, e.detail.selectedOption.value || "")
          }
          style={{ width: "150px" }}
        >
          <Option value="En curso">En curso</Option>
          <Option value="En revisión">En revisión</Option>
          <Option value="Pendiente pago">Pendiente pago</Option>
        </Select>
      ),
    },
  ];

  const data = [
    { numero: 1, proveedor: "Trupper", producto: "Martillo", estatus: "En curso" },
    { numero: 2, proveedor: "Trupper", producto: "Clavos", estatus: "En curso" },
    { numero: 3, proveedor: "Trupper", producto: "Llave inglesa", estatus: "En curso" },
    { numero: 4, proveedor: "Trupper", producto: "Destornillador", estatus: "En curso" },
    { numero: 5, proveedor: "Trupper", producto: "Sierra manual", estatus: "En curso" },
    { numero: 6, proveedor: "Trupper", producto: "Taladro electrico", estatus: "En curso" },
    { numero: 7, proveedor: "Trupper", producto: "Cinta metrica", estatus: "En curso" },
    { numero: 8, proveedor: "Trupper", producto: "Tenazas", estatus: "En curso" },
    { numero: 9, proveedor: "Trupper", producto: "Linterna", estatus: "En curso" },
    { numero: 10, proveedor: "Trupper", producto: "Cinta metrica", estatus: "En curso" },
    { numero: 11, proveedor: "Trupper", producto: "Tenazas", estatus: "En curso" },
    { numero: 12, proveedor: "Trupper", producto: "Linterna", estatus: "En curso" },
    { numero: 13, proveedor: "Trupper", producto: "Cinta metrica", estatus: "En revisión" },
    { numero: 14, proveedor: "Trupper", producto: "Tenazas", estatus: "Pendiente pago" },
    { numero: 15, proveedor: "Trupper", producto: "Linterna", estatus: "En curso" },
  ];

  const dataFiltrada = data.filter(
    (item) =>
      item.producto.toLowerCase().includes(filtro.toLowerCase()) &&
      (estatus ? item.estatus === estatus : true)
  );

  return (
    <div style={{ width: "100%"}}>

      {/* Filtros */}
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Input
          placeholder="Filtrar por nombre"
          value={filtro}
          onInput={(e) => setFiltro(((e.target as unknown) as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Select
          onChange={(e) => setEstatus(e.detail.selectedOption.value || "")}
          style={{ width: "200px" }}
        >
          <Option value="">Todos los estatus</Option>
          <Option value="En curso">En curso</Option>
          <Option value="En revisión">En revisión</Option>
          <Option value="Pendiente pago">Pendiente pago</Option>
        </Select>
      </div>

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={14}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
