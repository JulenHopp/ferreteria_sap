import { InventoryItem } from "../../services/api/inventory.service";

interface InventoryAnalyticsProps {
  data: InventoryItem[];
}

export default function InventoryAnalytics({ data }: InventoryAnalyticsProps) {
  return (
    <div style={{backgroundColor: 'black', width: '200px', height: '100%'}}>
      {/* Analytics content will go here */}
    </div>
  );
}
