import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/inventory.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/ai.js";
export interface NavItem {
  key: string;
  text: string;
  icon: string;
}

export const navPermissions: { [key: number]: NavItem[] } = {
  1: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "users", text: "Usuarios", icon: "group" },
  ],
  2: [
    { key: "inventoryEdit", text: "Inventario", icon: "list" },
  ],
  3: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "ai", text: "Asistencia IA", icon: "ai" },
  ],
};
