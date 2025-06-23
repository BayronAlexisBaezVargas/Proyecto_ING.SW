// frontend/src/pages/StockManagementPage.js
import React, { useState } from 'react';
// 1. Importamos 'message' de Ant Design para mostrar notificaciones
import { 
    Layout, 
    Row, 
    Col, 
    Typography, 
    Form, 
    Input, 
    Button, 
    Table,
    Select,
    InputNumber,
    message 
} from 'antd';

const { Title } = Typography;
const { Option } = Select;

const stockColumns = [
    { title: 'ID Producto', dataIndex: 'key', key: 'key' },
    { title: 'Nombre del Producto', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Tipo', dataIndex: 'tipo', key: 'tipo' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
];

const StockManagementPage = () => {
    const [stock, setStock] = useState([]);
    const [form] = Form.useForm();

    const handleAddItem = (values) => {
        // 2. Lógica de validación de duplicados
        // Buscamos si ya existe un item con el mismo nombre (ignorando mayúsculas/minúsculas)
        const nombreNuevo = values.nombre.trim().toLowerCase();
        const yaExiste = stock.some(item => item.nombre.trim().toLowerCase() === nombreNuevo);

        // 3. Si el producto ya existe, mostramos un mensaje de error y detenemos la función
        if (yaExiste) {
            message.error('El producto ya existe en el stock.');
            return; // Detenemos la ejecución para no añadir el duplicado
        }

        // Si no existe, continuamos con la lógica para añadir el producto
        const newProduct = {
            key: `P-${Date.now()}`,
            nombre: values.nombre.trim(), // Guardamos el nombre sin espacios extra
            tipo: values.tipo,
            cantidad: values.cantidad,
        };

        setStock(prevStock => [...prevStock, newProduct]);
        form.resetFields();
        
        // 4. Mostramos un mensaje de éxito
        message.success('Producto añadido correctamente.');
    };

    return (
        <Layout>
            <Title level={2}>Gestión de Stock</Title>
            <Row gutter={24}>
                <Col xs={24} md={8}>
                    <Title level={4}>Añadir Producto al Stock</Title>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddItem}
                    >
                        <Form.Item
                            name="nombre"
                            label="Nombre del Producto"
                            rules={[{ required: true, message: 'Por favor, ingresa el nombre del producto' }]}
                        >
                            <Input placeholder="Ej: Bicicleta de Montaña" />
                        </Form.Item>

                        <Form.Item
                            name="tipo"
                            label="Tipo de Producto"
                            rules={[{ required: true, message: 'Por favor, selecciona un tipo' }]}
                        >
                            <Select placeholder="Selecciona un tipo">
                                <Option value="Bicicleta">Bicicleta</Option>
                                <Option value="Repuesto">Repuesto</Option>
                                <Option value="Accesorio">Accesorio</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="cantidad"
                            label="Cantidad"
                            rules={[{ required: true, message: 'Por favor, ingresa la cantidad' }]}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                        
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Añadir al Stock
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>

                <Col xs={24} md={16}>
                    <Title level={4}>Stock Disponible</Title>
                    <Table
                        columns={stockColumns}
                        dataSource={stock}
                        scroll={{ y: 400 }}
                    />
                </Col>
            </Row>
        </Layout>
    );
};

export default StockManagementPage;