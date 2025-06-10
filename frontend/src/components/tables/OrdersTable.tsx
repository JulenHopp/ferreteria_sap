import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import { Order } from "../../services/api/order.service";

interface OrdersTableProps {
  data: Order[];
  loading: boolean;
  error: string | null;
  onStatusChange: (orderId: number, newStatus: string) => Promise<void>;
}

export default function OrdersTable({ data, loading, error, onStatusChange }: OrdersTableProps) {
  const [filtro, setFiltro] = useState("");
  const [estatus, setEstatus] = useState("");

  const columns = [
    { Header: "Proveedor", accessor: "PROVEEDOR" },
    { Header: "Producto", accessor: "NOMBRE_PRODUCTO" },
    { Header: "Cantidad", accessor: "CANTIDAD" },
    { Header: "Precio Unitario", accessor: "PRECIO_UNITARIO" },
    { Header: "Costo Total", accessor: "COSTO_TOTAL" },
    { Header: "Usuario", accessor: "NOMBRE_USUARIO" },
    {
      Header: "Estado",
      accessor: "ESTADOS",
      Cell: ({ row }: { row: { original: Order } }) => (
        <Select
          value={row.original.ESTADOS}
          onChange={(e) =>
            onStatusChange(row.original.ID, e.detail.selectedOption.value || "")
          }
          style={{ width: "150px" }}
        >
          <Option value="Aprobada">Aprobada</Option>
          <Option value="En Curso">En Curso</Option>
          <Option value="Finalizada">Finalizada</Option>
        </Select>
      ),
    },
    {
      Header: "Fecha Creación",
      accessor: "CREADO_EN",
      Cell: ({ value }: { value: string }) => {
        if (!value) return "";
        const dotIndex = value.indexOf('.');
        return dotIndex !== -1 ? value.substring(0, dotIndex) : value;
      }
    }
  ];

  const dataFiltrada = data.filter(
    (item) =>
      item.NOMBRE_PRODUCTO.toLowerCase().includes(filtro.toLowerCase()) &&
      (estatus ? item.ESTADOS === estatus : true)
  );

  if (loading) {
    return <BusyIndicator active={loading} size="L" style={{ margin: "10rem auto", display: "block" }} />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <div style={{ width: "100%" }}>
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
          <Option value="">Todos los estados</Option>
          <Option value="Aprobada">Aprobada</Option>
          <Option value="En Curso">En Curso</Option>
          <Option value="Finalizada">Finalizada</Option>
        </Select>
      </div>

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={10}
        scaleWidthMode="Grow"
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
