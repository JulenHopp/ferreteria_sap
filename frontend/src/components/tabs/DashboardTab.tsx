import { useState, useEffect } from 'react';
import {
    FlexBox,
    Card,
    Text,
    Title,
    Icon,
    BusyIndicator
} from '@ui5/webcomponents-react';
import { LineChart, PieChart } from '@ui5/webcomponents-react-charts';
import "@ui5/webcomponents-icons/dist/money-bills.js";
import "@ui5/webcomponents-icons/dist/cart.js";
import "@ui5/webcomponents-icons/dist/product.js";
import "@ui5/webcomponents-icons/dist/customer.js";

import { OrderService, Order } from '../../services/api/order.service';
import { InventoryService, InventoryItem } from '../../services/api/inventory.service';
import { SupplierService, Supplier } from '../../services/api/supplier.service';

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
            <FlexBox alignItems="Center" style={{ marginBottom: '1rem' }}>
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
                    fontWeight: '300',
                    marginTop: '0.5rem'
                }}>{title}</Text>
            </FlexBox>
            <Title 
                level="H1" 
                style={{ 
                    marginTop: '0.5rem',
                    fontSize: '3rem',
                    fontWeight: 'bold'
                }}
            >
                {value}
            </Title>
        </FlexBox>
    </Card>
);

export default function DashboardTab() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({
        totalSales: '$0',
        totalOrders: '0',
        totalProducts: '0',
        totalSuppliers: '0'
    });
    const [monthlyOrders, setMonthlyOrders] = useState<{ month: string; orders: number }[]>([]);
    const [ordersByStatus, setOrdersByStatus] = useState<{ status: string; value: number; color: string }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [orders, inventory, suppliers] = await Promise.all([
                    OrderService.getAllOrders(),
                    InventoryService.getAllInventory(),
                    SupplierService.getAllSuppliers()
                ]);

                // Calculate total sales with proper formatting
                const totalSales = orders.reduce((sum, order) => 
                    sum + parseFloat(order.COSTO_TOTAL), 0
                );
                const formattedSales = new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(totalSales);

                // Group orders by month
                const ordersByMonth = orders.reduce((acc: { [key: string]: number }, order) => {
                    const date = new Date(order.CREADO_EN);
                    const month = date.toLocaleString('es-ES', { month: 'short' });
                    acc[month] = (acc[month] || 0) + 1;
                    return acc;
                }, {});

                // Group orders by status
                const ordersByStatusMap = orders.reduce((acc: { [key: string]: number }, order) => {
                    acc[order.ESTADOS] = (acc[order.ESTADOS] || 0) + 1;
                    return acc;
                }, {});

                // Set stats
                setStats({
                    totalSales: formattedSales,
                    totalOrders: orders.length.toString(),
                    totalProducts: inventory.length.toString(),
                    totalSuppliers: suppliers.length.toString()
                });

                // Set monthly orders
                setMonthlyOrders(Object.entries(ordersByMonth).map(([month, orders]) => ({
                    month,
                    orders
                })));

                // Set orders by status with colors
                setOrdersByStatus(Object.entries(ordersByStatusMap).map(([status, value]) => ({
                    status,
                    value,
                    color: getStatusColor(status)
                })));

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Error al cargar los datos del dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'Aprobada': return '#5dc122';
            case 'En Curso': return '#0070f2';
            case 'Finalizada': return '#e9730c';
            default: return '#bb0000';
        }
    };

    if (loading) {
        return <BusyIndicator active={loading} size="L" style={{ margin: "10rem auto", display: "block" }} />;
    }

    if (error) {
        return <Text style={{ color: "red" }}>{error}</Text>;
    }

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
                        title="Total Ventas" 
                        value={stats.totalSales} 
                        icon="money-bills"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Órdenes" 
                        value={stats.totalOrders} 
                        icon="cart"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Productos" 
                        value={stats.totalProducts} 
                        icon="product"
                    />
                </FlexBox>
                <FlexBox style={{ flex: '1', minWidth: '250px' }}>
                    <StatCard 
                        title="Total Proveedores" 
                        value={stats.totalSuppliers} 
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
                                padding: '1.5rem 1rem 1rem 1rem',
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
                            dataset={monthlyOrders}
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
                                padding: '1.5rem 1rem 1rem 1rem',
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
                            dataset={ordersByStatus}
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
