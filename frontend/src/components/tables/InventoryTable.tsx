import { useState, useEffect } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
  Button,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import EditInventory from "../popups/EditInventory";
import { InventoryService, InventoryItem } from "../../services/api/inventory.service";

// Filter component
const InventoryFilters = ({ 
  filtro, 
  setFiltro, 
  categoria, 
  setCategoria, 
  uniqueCategories,
  onEditClick 
}: {
  filtro: string;
  setFiltro: (value: string) => void;
  categoria: string;
  setCategoria: (value: string) => void;
  uniqueCategories: string[];
  onEditClick: () => void;
}) => (
  <div style={{
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1.5rem"
  }}>
    <Input
      placeholder="Escribe nombre"
      value={filtro}
      onInput={(e) => setFiltro((e.target as unknown as HTMLInputElement).value)}
      style={{ width: "250px" }}
    />
    <Select
      value={categoria}
      onChange={(e) => setCategoria(e.detail.selectedOption.value || "")}
      style={{ width: "200px" }}
    >
      <Option value="">Seleccionar Categoría</Option>
      {uniqueCategories.map((cat) => (
        <Option key={cat} value={cat}>{cat}</Option>
      ))}
    </Select>
    <Button onClick={onEditClick}>Editar Inventario</Button>
  </div>
);

const TABLE_COLUMNS = [
  {
    Header: "Nombre del producto",
    accessor: "NOMBRE"
  },
  {
    Header: "Categoría",
    accessor: "CATEGORIA",
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
  }
];

export default function Inventario() {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const inventoryData = await InventoryService.getAllInventory();
        setData(inventoryData);
        setError(null);
      } catch (err) {
        setError('Error al cargar el inventario');
        console.error('Error fetching inventory:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const dataFiltrada = data.filter(
    (item) =>
      item.NOMBRE.toLowerCase().includes(filtro.trim().toLowerCase()) &&
      (categoria ? item.CATEGORIA === categoria : true)
  );

  const handleSaveChanges = (updatedItem: InventoryItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.ID === updatedItem.ID ? updatedItem : item
      )
    );
  };

  const uniqueCategories = [...new Set(data.map(item => item.CATEGORIA))];

  if (loading) {
    return <BusyIndicator active={loading} size="L" style={{ margin: "10rem auto", display: "block" }} />;
  }

  if (error) {
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  return (
    <div style={{ width: "100%" }}>
      <InventoryFilters
        filtro={filtro}
        setFiltro={setFiltro}
        categoria={categoria}
        setCategoria={setCategoria}
        uniqueCategories={uniqueCategories}
        onEditClick={() => setIsDialogOpen(true)}
      />

      <AnalyticalTable
        columns={TABLE_COLUMNS}
        data={dataFiltrada}
        visibleRows={14}
        scaleWidthMode="Grow"
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
        onSave={handleSaveChanges}
      />
    </div>
  );
}
