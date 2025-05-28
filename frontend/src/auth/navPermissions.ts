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
  //admin - admin@gmail.com
  1: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "users", text: "Usuarios", icon: "group" },
  ],
  
  //almacenista - almacen@gmail.com
  2: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "ai", text: "Asistencia IA", icon: "ai" },
  ],

  //comprador - comprador@gmail.com
  3: [
    { key: "inventory", text: "Inventario", icon: "list" },
  ],
};
