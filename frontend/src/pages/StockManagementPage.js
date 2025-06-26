// frontend/src/pages/StockManagementPage.js
import React, { useState, useEffect } from 'react';
// 1. Importamos los componentes Tabs, Spin y message
import { Table, Button, Modal, Form, InputNumber, message, Spin, Tabs, Typography } from 'antd';

const { Title } = Typography;
const { TabPane } = Tabs;

const StockManagementPage = () => {
    // 2. Creamos estados separados para cada tipo de producto
    const [productosVenta, setProductosVenta] = useState([]);
    const [productosArriendo, setProductosArriendo] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [form] = Form.useForm();

    // 3. Esta función ahora puede buscar cualquier tipo de producto
    const fetchProductos = async () => {
        setLoading(true);
        try {
            // Hacemos dos llamadas a la API, una para cada tipo
            const [ventaResponse, arriendoResponse] = await Promise.all([
                fetch('http://localhost:8000/api/productos?tipo=Venta'),
                fetch('http://localhost:8000/api/productos?tipo=Arriendo')
            ]);

            const ventaData = await ventaResponse.json();
            const arriendoData = await arriendoResponse.json();

            setProductosVenta(ventaData);
            setProductosArriendo(arriendoData);
        } catch (error) {
            message.error("Error al cargar el stock.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleAddStock = (product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const handleModalSubmit = async (values) => {
        const { cantidad } = values;
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8000/api/stock', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ productId: selectedProduct.id, cantidad }),
            });
            if (!response.ok) throw new Error('Error al actualizar.');
            
            message.success('Stock actualizado con éxito.');
            setIsModalVisible(false);
            form.resetFields();
            fetchProductos(); // Recargamos los datos de ambas tablas
        } catch (error) {
            message.error(error.message);
        }
    };

    // 4. Definimos las columnas que usarán ambas tablas
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id', width: '15%' },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', width: '55%' },
        { title: 'Stock Actual', dataIndex: 'stock', key: 'stock', width: '15%' },
        { 
            title: 'Acción', 
            key: 'action',
            width: '15%',
            render: (_, record) => <Button onClick={() => handleAddStock(record)}>Añadir Stock</Button> 
        }
    ];

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

    return (
        <>
            <Title level={2}>Gestión de Stock</Title>
            {/* 5. Implementamos el componente Tabs */}
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bicicletas en Venta" key="1">
                    <Table dataSource={productosVenta} columns={columns} rowKey="id" />
                </TabPane>
                <TabPane tab="Bicicletas para Arriendo" key="2">
                    <Table dataSource={productosArriendo} columns={columns} rowKey="id" />
                </TabPane>
            </Tabs>

            {/* El modal para añadir stock es reutilizado por ambas tablas */}
            <Modal
                title={`Añadir stock a: ${selectedProduct?.nombre}`}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleModalSubmit}>
                    <Form.Item name="cantidad" label="Cantidad a añadir" rules={[{ required: true, message: 'Ingresa una cantidad' }]}>
                        <InputNumber min={1} style={{width: '100%'}} />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Confirmar</Button>
                </Form>
            </Modal>
        </>
    );
};

export default StockManagementPage;
