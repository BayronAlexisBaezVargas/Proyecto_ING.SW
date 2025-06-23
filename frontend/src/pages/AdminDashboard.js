// frontend/src/pages/AdminDashboard.js
import React from 'react';
import { Table, Typography, Space } from 'antd';

const { Title } = Typography;

// 1. Dejamos los datos de ejemplo como arreglos vacíos.
//    Cuando conectemos el backend, aquí recibiremos los datos reales.
const comprasData = [];
const arriendosData = [];

// Las definiciones de las columnas no cambian, ya que describen la estructura de la tabla.
const comprasColumns = [
  { title: 'ID Compra', dataIndex: 'id', key: 'id' },
  { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
  { title: 'Producto', dataIndex: 'producto', key: 'producto' },
  { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
];

const arriendosColumns = [
    { title: 'ID Arriendo', dataIndex: 'id', key: 'id' },
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Bicicleta', dataIndex: 'bicicleta', key: 'bicicleta' },
    { title: 'Fecha de Inicio', dataIndex: 'fechaInicio', key: 'fechaInicio' },
    { title: 'Fecha de Fin', dataIndex: 'fechaFin', key: 'fechaFin' },
    { title: 'Costo', dataIndex: 'costo', key: 'costo' },
];

const AdminDashboard = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Panel de Administración</Title>

      <Title level={4}>Compras Realizadas</Title>
      {/* 2. Añadimos la propiedad 'scroll' a la tabla de compras */}
      <Table 
        dataSource={comprasData} 
        columns={comprasColumns} 
        scroll={{ y: 300 }} // Fija la altura máxima del cuerpo de la tabla a 300px
      />

      <Title level={4}>Arriendos Realizados</Title>
      {/* 3. Añadimos también la propiedad 'scroll' a la tabla de arriendos */}
      <Table 
        dataSource={arriendosData} 
        columns={arriendosColumns}
        scroll={{ y: 300 }} // Fija la altura máxima del cuerpo de la tabla a 300px
      />
    </Space>
  );
};

export default AdminDashboard;