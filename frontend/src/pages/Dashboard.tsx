import { useState, ReactNode } from 'react';
import {
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';
import NavLayout from '../components/nav/NavLayout';
import InventoryTable from '../components/tables/InventoryTable';
import InventoryTableEdit from '../components/tables/InventoryTableEdit';
import DashboardTable from '../components/tables/OrdersTable';
import UsersTable from '../components/tables/UsersTable';
import { navPermissions, NavItem } from "../auth/navPermissions";

export default function Dashboard() {
    const [selectedKey, setSelectedKey] = useState("inventory");
    const menuItems: NavItem[] = navPermissions[3] || []; // hardcoded admin for now

    const contentMap: Record<string, ReactNode> = {
        inventory: <InventoryTable />,
        inventoryEdit: <InventoryTableEdit />,
        orders: <DashboardTable />,
        users: <UsersTable />,
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
