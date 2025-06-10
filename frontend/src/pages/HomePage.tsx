import { useState, ReactNode, useEffect } from 'react';
import {
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';
import "@ui5/webcomponents-icons/dist/home.js";
import NavLayout from '../components/nav/NavLayout';
import InventoryTab from '../components/tabs/InventoryTab';
import OrdersTab from '../components/tabs/OrdersTab';
import UsersTab from '../components/tabs/UsersTab';
import AiPage from './AiPage';
import DashboardTab from '../components/tabs/DashboardTab';
import { navPermissions, NavItem } from "../auth/navPermissions";
import { useAuth } from '../auth/AuthContext';

const STORAGE_KEY = 'selectedTab';

export default function MainPage() {
    const { rol_id } = useAuth();
    const menuItems: NavItem[] = navPermissions[rol_id] || [];
    
    const [selectedKey, setSelectedKey] = useState(() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved && menuItems.some(item => item.key === saved)) {
            return saved;
        }
        return menuItems[0]?.key || '';
    });

    useEffect(() => {
        if (selectedKey) {
            sessionStorage.setItem(STORAGE_KEY, selectedKey);
        }
    }, [selectedKey]);

    const contentMap: Record<string, ReactNode> = {
        dashboard: <DashboardTab />,
        inventory: <InventoryTab />,
        orders: <OrdersTab />,
        users: <UsersTab />,
        ai: <AiPage />
    };

    const handleSelectionChange = (e: any) => {
        const newKey = e.detail.item.dataset.key;
        if (newKey && menuItems.some(item => item.key === newKey)) {
            setSelectedKey(newKey);
        }
    };

    if (!menuItems.length) {
        return <div>No hay opciones disponibles para tu rol</div>;
    }

    return (
        <NavLayout
            sideContent={
                <SideNavigation
                    onSelectionChange={handleSelectionChange}
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
            {selectedKey && contentMap[selectedKey] || <div>Selecciona una opción del menú</div>}
        </NavLayout>
    );
}
