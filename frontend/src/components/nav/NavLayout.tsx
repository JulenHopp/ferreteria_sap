import { ReactNode, useState } from 'react';
import {
    Avatar,
    FlexBox,
    NavigationLayout,
    ShellBar,
    type UI5WCSlotsNode,
    Popover,
    Button
} from '@ui5/webcomponents-react';

interface NavLayoutProps {
    children: ReactNode;
    sideContent: UI5WCSlotsNode;
}

export default function NavLayout({ children, sideContent }: NavLayoutProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [popoverOpener, setPopoverOpener] = useState<HTMLElement | undefined>(undefined);

    const handleProfileClick = (e: any) => {
        setIsPopoverOpen(true);
        setPopoverOpener(e.detail.targetRef);
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
                    onProfileClick={handleProfileClick}
                />
            }
            sideContent={sideContent}
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
                {children}
            </FlexBox>
            <Popover
                open={isPopoverOpen}
                opener={popoverOpener}
                onClose={() => setIsPopoverOpen(false)}
            >
                <div style={{ padding: '1rem' }}>
                    <Button 
                        onClick={() => {
                            // Add logout logic here
                            setIsPopoverOpen(false);
                        }}
                    >
                        Cerrar Sesión
                    </Button>
                </div>
            </Popover>
        </NavigationLayout>
    );
}