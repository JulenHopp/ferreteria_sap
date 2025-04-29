import {
    Button,
    NavigationLayout,
    ShellBar,
    SideNavigation,
    SideNavigationGroup,
    SideNavigationItem,
    SideNavigationSubItem,
    Text,
    Title
} from '@ui5/webcomponents-react';

export default function NavLayout() {
    return (
        <div
        style={{
            height: '800px',
            position: 'relative'
        }}
        >
        <NavigationLayout
            mode="Collapsed"
            header={
                <ShellBar
                    logo={<img src="img/icon-dark.png" />}
                    primaryTitle="Ferreteria Julen"
                    secondaryTitle="Gestión de Inventario"
                />
            }
            sideContent={
                <SideNavigation
                    onSelectionChange={function Xs(){}} slot="sideContent">
                    <SideNavigationItem icon="home" text="Home"/>
                    <SideNavigationGroup expanded text="Group 1">
                        <SideNavigationItem expanded icon="locate-me" text="Item 1">
                            <SideNavigationSubItem text="Sub Item 1" />
                            <SideNavigationSubItem text="Sub Item 2" />
                        </SideNavigationItem>
                        <SideNavigationItem expanded icon="calendar" text="Item 2">
                            <SideNavigationSubItem text="Sub Item 3" />
                            <SideNavigationSubItem text="Sub Item 4" />
                        </SideNavigationItem>
                        <SideNavigationItem expanded icon="activity-assigned-to-goal" text="Item 3">
                            <SideNavigationSubItem text="Sub Item 5" />
                            <SideNavigationSubItem text="Sub Item 6" />
                        </SideNavigationItem>
                    </SideNavigationGroup>
                    <SideNavigationGroup expanded text="Group 2">
                        <SideNavigationItem icon="history" text="Item 4"/>
                        <SideNavigationItem icon="source-code" text="Item 5"/>
                        <SideNavigationItem icon="background" text="Item 6"/>
                    </SideNavigationGroup>
                    <SideNavigationItem href="https://www.sap.com/about/legal/impressum.html" icon="compare" slot="fixedItems" target="_blank" text="Legal"/>
                    <SideNavigationItem href="https://www.sap.com/about/legal/privacy.html" icon="locked" slot="fixedItems" target="_blank" text="Privacy"/>
                    <SideNavigationItem href="https://www.sap.com/terms-of-use" icon="document-text" slot="fixedItems" target="_blank" text="Terms of Use"/>
                </SideNavigation>}>
            <div
            style={{
                padding: '1rem'
            }}
            >
            <div>
                <Title>
                Home
                </Title>
                <br />
                <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </div>
            </div>
        </NavigationLayout>
        
        </div>
    );
}