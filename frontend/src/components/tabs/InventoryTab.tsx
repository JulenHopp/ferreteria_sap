import { useState, useEffect } from "react";
import { InventoryService, InventoryItem } from "../../services/api/inventory.service";
import InventoryTable from "../tables/InventoryTable";
import InventoryAnalytics from "../analytics/InventoryAnalytics";

export default function InventoryTab() {
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

  const handleSaveChanges = async (updatedItem: InventoryItem) => {
    try {
      await InventoryService.updateInventory(updatedItem);
      await fetchInventory();
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '1.5rem', 
      height: '100%',
      width: '100%'
    }}>
      <div style={{ flex: '1 1 70%', minWidth: 0 }}>
        <InventoryTable 
          data={data} 
          loading={loading} 
          error={error} 
          onSave={handleSaveChanges}
        />
      </div>
      <div style={{ flex: '1 1 30%', minWidth: 0, maxWidth: '350px' }}>
        <InventoryAnalytics data={data} />
      </div>
    </div>
  );
}
