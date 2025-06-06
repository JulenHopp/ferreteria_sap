import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/inventory.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/ai.js";
import "@ui5/webcomponents-icons/dist/bbyd-dashboard.js";

export interface NavItem {
  key: string;
  text: string;
  icon: string;
}

export const navPermissions: { [key: number]: NavItem[] } = {
  //admin - admin@gmail.com
  1: [
    { key: "dashboard", text: "Dashboard", icon: "bbyd-dashboard" },
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "users", text: "Usuarios", icon: "group" },
  ],

  //comprador - comprador@gmail.com
  2: [
    { key: "dashboard", text: "Dashboard", icon: "bbyd-dashboard" },
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "ai", text: "Asistencia IA", icon: "ai" },
  ],
  
  //almacenista - almacen@gmail.com
  3: [
    { key: "dashboard", text: "Dashboard", icon: "bbyd-dashboard" },
    { key: "inventory", text: "Inventario", icon: "list" },
  ],
};
