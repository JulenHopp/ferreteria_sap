import "@ui5/webcomponents-icons/dist/customer.js";
import "@ui5/webcomponents-icons/dist/list.js";
import "@ui5/webcomponents-icons/dist/inventory.js";
import "@ui5/webcomponents-icons/dist/group.js";
import "@ui5/webcomponents-icons/dist/ai.js";

export type UserRole = 'admin' | 'almacenador' | 'comprador';

export interface NavItem {
  key: string;
  text: string;
  icon: string;
}

export const navPermissions: Record<UserRole, NavItem[]> = {
  admin: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "users", text: "Usuarios", icon: "group" },
  ],
  almacenador: [
    { key: "inventory", text: "Inventario", icon: "list" },
  ],
  comprador: [
    { key: "inventory", text: "Inventario", icon: "list" },
    { key: "orders", text: "Pedidos", icon: "inventory" },
    { key: "ai", text: "Asistencia IA", icon: "ai" },
  ],
};
