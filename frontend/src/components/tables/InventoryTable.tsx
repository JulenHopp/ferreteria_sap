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

const TABLE_COLUMNS = [
  { Header: "ID", accessor: "ID" },
  { Header: "Nombre del producto", accessor: "NOMBRE_PRODUCTO" },
  { Header: "Categoría", accessor: "CATEGORIA" },
  { Header: "Cantidad", accessor: "CANTIDAD" },
  { Header: "Descripción", accessor: "DESCRIPCION" },
  { Header: "Ubicación", accessor: "UBICACION" },
  { Header: "Precio", accessor: "PRECIO_UNITARIO" }
];

export default function Inventario() {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchInventory();
  }, []);

  const dataFiltrada = data.filter((item) => {
    const searchText = filtro.trim().toLowerCase();
    const itemName = String(item.NOMBRE_PRODUCTO || '').toLowerCase();
    const itemCategory = String(item.CATEGORIA || '');
    
    return (searchText === '' || itemName.includes(searchText)) &&
           (categoria === '' || itemCategory === categoria);
  });

  const handleSaveChanges = async (updatedItem: InventoryItem) => {
    try {
      await InventoryService.updateInventory(updatedItem);
      await fetchInventory(); // Fetch fresh data after successful update
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
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
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <Input
          placeholder="Buscar por nombre"
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
