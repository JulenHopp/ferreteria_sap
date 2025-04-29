import {
    Avatar,
    FlexBox,
    NavigationLayout,
    ShellBar,
    SideNavigation,
    SideNavigationItem,
} from '@ui5/webcomponents-react';

import { useState, ReactNode } from 'react';

import InventoryTable from '../tables/InventoryTable';
import DashboardTable from '../tables/OrdersTable';
import UsersTable from '../tables/UsersTable';
import { navPermissions, NavItem } from "../../auth/navPermissions";

export default function NavLayout() {
    const [selectedKey, setSelectedKey] = useState("inventory");
    const menuItems: NavItem[] = navPermissions["admin"] || []; // hardcoded admin for now

    const contentMap: Record<string, ReactNode> = {
        inventory: <InventoryTable />,
        orders: <DashboardTable />,
        users: <UsersTable />,
    };

    return (
        <NavigationLayout
            mode="Collapsed"
            header={
                <ShellBar
                    logo={<img alt="FJ Logo" src="./img/icon-dark.png" style={{paddingRight: "1rem"}}/>}
                    primaryTitle="Ferreteria Julen"
                    profile={<Avatar icon={"customer"} size='M'/>}
                    secondaryTitle="Gestión de Inventario"
                    onProfileClick={function Xs(){}} // TODO: Implement profile click handler logout
                />
            }
            sideContent={
                <SideNavigation
                    onSelectionChange={(e) =>
                        setSelectedKey(e.detail.item.dataset.key || menuItems[0]?.key || "inventory")
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
            style={{
                minWidth: '600px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <FlexBox
                alignItems='Center'
                justifyContent='Center'
                style={{
                    flex: 1,
                    padding: '2rem',
                    boxSizing: 'border-box',
                    overflow: 'auto',
                }}
            >
                {contentMap[selectedKey] || <div>Selecciona una opción del menú</div>}
            </FlexBox>
        </NavigationLayout>
    );
}