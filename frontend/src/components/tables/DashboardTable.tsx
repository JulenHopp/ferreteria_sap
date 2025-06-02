import {
    FlexBox,
    Card,
    Text,
    Title,
    Icon
} from '@ui5/webcomponents-react';
import { LineChart, PieChart } from '@ui5/webcomponents-react-charts';
import "@ui5/webcomponents-icons/dist/money-bills.js";
import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/customer.js";

// Mock data - replace with real data from your API
const mockData = {
    totalSales: '$45,678',
    totalOrders: '123',
    totalProducts: '456',
    totalUsers: '89',
    monthlyOrders: [
        { month: 'Ene', orders: 45 },
        { month: 'Feb', orders: 55 },
        { month: 'Mar', orders: 65 },
        { month: 'Abr', orders: 48 },
        { month: 'May', orders: 52 },
        { month: 'Jun', orders: 58 }
    ],
    ordersByStatus: [
        { status: 'Completado', value: 35, color: '#5dc122' },   // Verde
        { status: 'En Proceso', value: 28, color: '#0070f2' },   // Azul
        { status: 'Pendiente', value: 15, color: '#e9730c' },    // Naranja
        { status: 'Cancelado', value: 5, color: '#bb0000' }      // Rojo
    ]
};

const StatCard = ({ title, value, icon }: { title: string; value: string; icon: string }) => (
    <Card
        style={{
            width: '100%',
            margin: '0.5rem',
            padding: '1rem',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}
    >
        <FlexBox direction="Column" alignItems="Center">
            <FlexBox alignItems="Center" style={{ marginBottom: '0.75rem' }}>
                <Icon 
                    name={icon} 
                    style={{ 
                        marginRight: '0.75rem',
                        fontSize: '2.5rem',
                        color: 'var(--sapContent_Illustrative_Color1)'
                    }} 
                />
                <Text style={{ 
                    fontSize: '1.8rem',
                    fontWeight: '300'
                }}>{title}</Text>
            </FlexBox>
            <Title 
                level="H1" 
                style={{ 
                    marginTop: '0.25rem',
                    fontSize: '3rem',
                    fontWeight: 'bold'
                }}
            >
                {value}
            </Title>
        </FlexBox>
    </Card>
);

export default function DashboardTable() {
    return (
        <FlexBox 
            direction="Column" 
            style={{ 
                width: '100%',
                padding: '1rem',
                gap: '1rem'
            }}
        >
            {/* Stats Row */}
            <FlexBox wrap="Wrap" style={{ gap: '1rem' }}>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Sales" 
                        value={mockData.totalSales} 
                        icon="money-bills"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Orders" 
                        value={mockData.totalOrders} 
                        icon="cart"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Products" 
                        value={mockData.totalProducts} 
                        icon="product"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Buyers" 
                        value={mockData.totalUsers} 
                        icon="customer"
                    />
                </FlexBox>
            </FlexBox>

            {/* Charts Row */}
            <FlexBox style={{ gap: '1rem' }}>
                {/* Monthly Orders Trend */}
                <Card
                    style={{ flex: 1, padding: '1rem' }}
                    header={
                        <Title 
                            level="H4" 
                            style={{ 
                                padding: '1rem 1rem 0.5rem 1rem',
                                borderBottom: '1px solid var(--sapList_BorderColor)'
                            }}
                        >
                            Tendencia de Órdenes Mensuales
                        </Title>
                    }
                >
                    <div style={{ height: '300px' }}>
                        <LineChart 
                            dimensions={[{ accessor: 'month' }]}
                            measures={[{ accessor: 'orders', label: 'Órdenes' }]}
                            dataset={mockData.monthlyOrders}
                        />
                    </div>
                </Card>

                {/* Orders by Status */}
                <Card
                    style={{ flex: 1, padding: '1rem' }}
                    header={
                        <Title 
                            level="H4" 
                            style={{ 
                                padding: '1rem 1rem 0.5rem 1rem',
                                borderBottom: '1px solid var(--sapList_BorderColor)'
                            }}
                        >
                            Órdenes por Estado
                        </Title>
                    }
                >
                    <div style={{ height: '300px', position: 'relative' }}>
                        <PieChart 
                            dimension={{ accessor: 'status' }}
                            measure={{ accessor: 'value' }}
                            dataset={mockData.ordersByStatus}
                            chartConfig={{
                                legendPosition: 'bottom',
                                legendHorizontalAlign: 'center',
                                margin: { top: 30, bottom: 30 }
                            }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </Card>
            </FlexBox>            
        </FlexBox>
    );
} 