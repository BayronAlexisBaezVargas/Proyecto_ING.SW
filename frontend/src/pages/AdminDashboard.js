// frontend/src/pages/AdminDashboard.js

import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Table, Spin, message } from 'antd';
// Importamos los componentes de la librería de gráficos
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// Colores para el gráfico de torta
const COLORS = ['#0088FE', '#00C49F'];

// Definimos las columnas para la tabla de compras
const comprasColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
  { title: 'Producto', dataIndex: 'producto', key: 'producto' },
  { 
    title: 'Total', 
    dataIndex: 'precio_unitario', 
    key: 'total', 
    render: (text) => `$${new Intl.NumberFormat('es-CL').format(text)}` 
  },
];

// Definimos las columnas para la tabla de arriendos
const arriendosColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
  { title: 'Bicicleta', dataIndex: 'bicicleta', key: 'bicicleta' },
  { 
    title: 'Costo Total', 
    dataIndex: 'costo_total', 
    key: 'costo', 
    render: (text) => `$${new Intl.NumberFormat('es-CL').format(text)}` 
  },
];

const AdminDashboard = () => {
    // Estado para guardar los datos que vienen del backend
    const [dashboardData, setDashboardData] = useState({ compras: [], arriendos: [] });
    // Estado para mostrar un spinner mientras se cargan los datos
    const [loading, setLoading] = useState(true);

    // Este efecto se ejecuta una sola vez para llamar a la API
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/dashboard-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos del dashboard.');
                }
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // --- Preparación de Datos para los Gráficos ---
    // Se calculan a partir de los datos reales del estado
    const pieChartData = [
      { name: 'Compras', value: dashboardData.compras.length },
      { name: 'Arriendos', value: dashboardData.arriendos.length },
    ];

    const totalIngresosCompras = dashboardData.compras.reduce((sum, item) => sum + parseInt(item.precio_unitario, 10), 0);
    const totalIngresosArriendos = dashboardData.arriendos.reduce((sum, item) => sum + parseInt(item.costo_total, 10), 0);
    
    const barChartData = [
        { name: 'Total Ingresos', Compras: totalIngresosCompras, Arriendos: totalIngresosArriendos }
    ];

    // Si está cargando, mostramos un spinner
    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

    return (
        <div>
            <Title level={2}>Panel de Administración</Title>
            
            {/* Fila de Gráficos */}
            <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
                <Col xs={24} md={12}>
                    <Card title="Comparativa de Transacciones (Cantidad)">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Comparativa de Ingresos ($)">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={barChartData}>
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(value) => `$${new Intl.NumberFormat('es-CL').format(value)}`} />
                                <Tooltip formatter={(value) => `$${new Intl.NumberFormat('es-CL').format(value)}`} />
                                <Legend />
                                <Bar dataKey="Compras" fill="#0088FE" />
                                <Bar dataKey="Arriendos" fill="#00C49F" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Row>

            {/* Fila de Tablas */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card title="Últimas Compras Realizadas">
                        <Table dataSource={dashboardData.compras} columns={comprasColumns} rowKey="id" pagination={{ pageSize: 5 }} scroll={{ x: true }} />
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Últimos Arriendos Realizados">
                        <Table dataSource={dashboardData.arriendos} columns={arriendosColumns} rowKey="id" pagination={{ pageSize: 5 }} scroll={{ x: true }} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard;
