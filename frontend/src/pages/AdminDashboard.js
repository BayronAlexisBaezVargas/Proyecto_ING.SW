// frontend/src/pages/AdminDashboard.js

import React from 'react';
import { Typography, Row, Col, Card, Table } from 'antd';
// Importamos los componentes de Recharts
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title } = Typography;

// --- DATOS DE EJEMPLO ---
// Simulan los datos que vendrían del backend
const comprasData = [
  { key: '1', id: 'C-001', cliente: 'Juan Pérez', producto: 'Bicicleta de Montaña Pro', fecha: '2025-06-15', total: 350000 },
  { key: '2', id: 'C-002', cliente: 'Ana Gómez', producto: 'Casco de Seguridad Pro', fecha: '2025-06-16', total: 45000 },
  { key: '3', id: 'C-003', cliente: 'Carlos Ruiz', producto: 'Kit de Luces LED', fecha: '2025-06-17', total: 25000 },
  { key: '4', id: 'C-004', cliente: 'Laura Méndez', producto: 'Bicicleta de Ruta Veloz', fecha: '2025-06-18', total: 799990 },
];

const arriendosData = [
  { key: '1', id: 'A-001', cliente: 'María Rojas', bicicleta: 'Bicicleta Urbana Eléctrica', fechaInicio: '2025-06-10', fechaFin: '2025-06-12', costo: 30000 },
  { key: '2', id: 'A-002', cliente: 'Pedro Soto', bicicleta: 'Bicicleta de Ruta Carbono', fechaInicio: '2025-06-14', fechaFin: '2025-06-14', costo: 15000 },
  { key: '3', id: 'A-003', cliente: 'Juan Pérez', bicicleta: 'Fatbike Todo Terreno', fechaInicio: '2025-06-18', fechaFin: '2025-06-20', costo: 66000 },
];

// --- PREPARACIÓN DE DATOS PARA GRÁFICOS ---
const pieChartData = [
  { name: 'Compras', value: comprasData.length },
  { name: 'Arriendos', value: arriendosData.length },
];
const COLORS = ['#0088FE', '#00C49F'];

const totalIngresosCompras = comprasData.reduce((sum, item) => sum + item.total, 0);
const totalIngresosArriendos = arriendosData.reduce((sum, item) => sum + item.costo, 0);

const barChartData = [
    { name: 'Total Ingresos', Compras: totalIngresosCompras, Arriendos: totalIngresosArriendos }
];

// --- DEFINICIÓN DE COLUMNAS PARA LAS TABLAS ---
const comprasColumns = [
  { title: 'ID Compra', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
  { title: 'Producto', dataIndex: 'producto', key: 'producto' },
  { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
  { title: 'Total', dataIndex: 'total', key: 'total', render: (text) => `$${new Intl.NumberFormat('es-CL').format(text)}` },
];

const arriendosColumns = [
  { title: 'ID Arriendo', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
  { title: 'Bicicleta', dataIndex: 'bicicleta', key: 'bicicleta' },
  { title: 'Fecha de Inicio', dataIndex: 'fechaInicio', key: 'fechaInicio' },
  { title: 'Fecha de Fin', dataIndex: 'fechaFin', key: 'fechaFin' },
  { title: 'Costo', dataIndex: 'costo', key: 'costo', render: (text) => `$${new Intl.NumberFormat('es-CL').format(text)}` },
];


const AdminDashboard = () => {
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
                <Table dataSource={comprasData} columns={comprasColumns} pagination={{ pageSize: 5 }} scroll={{ x: true }} />
            </Card>
        </Col>
        <Col xs={24} lg={12}>
            <Card title="Últimos Arriendos Realizados">
                <Table dataSource={arriendosData} columns={arriendosColumns} pagination={{ pageSize: 5 }} scroll={{ x: true }} />
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
