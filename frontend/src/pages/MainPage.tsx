import { useState, ReactNode } from 'react';
import {
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/home.js";
import NavLayout from '../components/nav/NavLayout';
import InventoryTable from '../components/tables/InventoryTable';
import OrdersTable from '../components/tables/OrdersTable';
import UsersTable from '../components/tables/UsersTable';
import AiTable from '../components/tables/AiTable';
import DashboardTable from '../components/tables/DashboardTable';
import { navPermissions, NavItem } from "../auth/navPermissions";
import { useAuth } from '../context/AuthContext';

export default function MainPage() {
    const [selectedKey, setSelectedKey] = useState("dashboard");
    const { rol_id } = useAuth();
    const menuItems: NavItem[] = navPermissions[rol_id] || [];

    const contentMap: Record<string, ReactNode> = {
        dashboard: <DashboardTable />,
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
                        setSelectedKey(e.detail.item.dataset.key ?? menuItems[0]?.key ?? "dashboard")
                    }
                >
                    <SideNavigationItem
                        key="dashboard"
                        text="Dashboard"
                        icon="home"
                        selected={selectedKey === "dashboard"}
                        data-key="dashboard"
                    />
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
