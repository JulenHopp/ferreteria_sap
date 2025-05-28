import { useState, ReactNode } from 'react';
import {
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';
import NavLayout from '../components/nav/NavLayout';
import InventoryTable from '../components/tables/InventoryTable';
import OrdersTable from '../components/tables/OrdersTable';
import UsersTable from '../components/tables/UsersTable';
import AiTable from '../components/tables/AiTable';
import { navPermissions, NavItem } from "../auth/navPermissions";
import { useAuth } from '../auth/AuthContext';

export default function Dashboard() {
    const [selectedKey, setSelectedKey] = useState("inventory");
    const { rol_id } = useAuth();
    const menuItems: NavItem[] = navPermissions[rol_id] || [];

    const contentMap: Record<string, ReactNode> = {
        inventory: <InventoryTable />,
        orders: <OrdersTable />,
        users: <UsersTable />,
        ai: <AiTable />
    };

    return (
        <NavLayout
            sideContent={
                <SideNavigation
                    onSelectionChange={(e) =>
                        setSelectedKey(e.detail.item.dataset.key ?? menuItems[0]?.key ?? "inventory")
                    }
                >
                    {menuItems.map((item: NavItem) => (
                        <SideNavigationItem
                            key={item.key}
                            text={item.text}
                            icon={item.icon}
                            selected={selectedKey === item.key}
                            data-key={item.key}
                        />
                    ))}
                </SideNavigation>
            }
        >
            {contentMap[selectedKey] || <div>Selecciona una opción del menú</div>}
        </NavLayout>
    );
}
