import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
  Button,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import EditInventory from "../popups/inventory/EditInventory";
import { InventoryItem } from "../../services/api/inventory.service";

const TABLE_COLUMNS = [
  { Header: "Producto", accessor: "NOMBRE_PRODUCTO" },
  { Header: "Categoría", accessor: "CATEGORIA" },
  { Header: "Cantidad", accessor: "CANTIDAD" },
  { Header: "Descripción", accessor: "DESCRIPCION" },
  { Header: "Ubicación", accessor: "UBICACION" },
  { Header: "Precio", accessor: "PRECIO_UNITARIO" }
];

interface InventoryTableProps {
  data: InventoryItem[];
  loading: boolean;
  error: string | null;
  onSave: (updatedItem: InventoryItem) => Promise<void>;
}

export default function InventoryTable({ data, loading, error, onSave }: InventoryTableProps) {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dataFiltrada = data.filter((item) => {
    const searchText = filtro.trim().toLowerCase();
    const itemName = String(item.NOMBRE_PRODUCTO || '').toLowerCase();
    const itemCategory = String(item.CATEGORIA || '');
    
    return (searchText === '' || itemName.includes(searchText)) &&
           (categoria === '' || itemCategory === categoria);
  });

  const uniqueCategories = [...new Set(data.map(item => item.CATEGORIA))];

  if (loading) {
    return <BusyIndicator active={loading} size="L" style={{ margin: "10rem auto", display: "block" }} />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Input
          placeholder="Buscar por producto"
          value={filtro}
          onInput={(e) => setFiltro((e.target as unknown as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Select
          value={categoria}
          onChange={(e) => setCategoria(e.detail.selectedOption.value || "")}
          style={{ width: "200px" }}
        >
          <Option value="">Todas las categorías</Option>
          {uniqueCategories.map((cat) => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>
        <Button onClick={() => setIsDialogOpen(true)}>Editar Inventario</Button>
      </div>

      <AnalyticalTable
        columns={TABLE_COLUMNS}
        data={dataFiltrada}
        visibleRows={14}
        sortable={true}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />

      <EditInventory
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        data={data}
        onSave={onSave}
      />
    </div>
  );
}
