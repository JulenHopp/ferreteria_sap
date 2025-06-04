import { useState, ReactNode, useEffect } from 'react';
import {
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/home.js";
import NavLayout from '../components/nav/NavLayout';
import InventoryTab from '../components/tabs/InventoryTab';
import OrdersTable from '../components/tables/OrdersTable';
import UsersTable from '../components/tables/UsersTable';
import AiPage from './AiPage';
import DashboardTable from '../components/tables/DashboardTable';
import { navPermissions, NavItem } from "../auth/navPermissions";
import { useAuth } from '../auth/AuthContext';

const STORAGE_KEY = 'selectedTab';

export default function MainPage() {
    const { rol_id } = useAuth();
    const menuItems: NavItem[] = navPermissions[rol_id] || [];
    
    // Initialize state from session storage or default to dashboard
    const [selectedKey, setSelectedKey] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        // Validate that the saved key exists in the current user's permissions
        if (saved && (saved === 'dashboard' || menuItems.some(item => item.key === saved))) {
            return saved;
        }
        return 'dashboard';
    });

    // Update session storage when selectedKey changes
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, selectedKey);
    }, [selectedKey]);

    const contentMap: Record<string, ReactNode> = {
        dashboard: <DashboardTable />,
        inventory: <InventoryTab />,
        orders: <OrdersTable />,
        users: <UsersTable />,
        ai: <AiPage />
    };

    const handleSelectionChange = (e: any) => {
        const newKey = e.detail.item.dataset.key ?? menuItems[0]?.key ?? "dashboard";
        setSelectedKey(newKey);
    };

    return (
        <NavLayout
            sideContent={
                <SideNavigation
                    onSelectionChange={handleSelectionChange}
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
