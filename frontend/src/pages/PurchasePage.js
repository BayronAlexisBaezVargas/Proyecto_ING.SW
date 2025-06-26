// frontend/src/pages/PurchasePage.js

import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Row, Col, Spin, Tag, message } from 'antd';
import { useCart } from '../context/CartContext';

import imgMontana from '../assets/images/bici_montana.jpg';
import imgUrbana from '../assets/images/bici_urbana.jpg';
import imgRuta from '../assets/images/bici_ruta.jpg';
import imgElectrica from '../assets/images/bici_electrica.jpg';

const { Title, Text } = Typography;
const { Meta } = Card;

const imageMap = {
    'bici_montana.jpg': imgMontana,
    'bici_urbana.jpg': imgUrbana,
    'bici_ruta.jpg': imgRuta,
    'bici_electrica.jpg': imgElectrica,
};

const PurchasePage = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/productos?tipo=Venta');
                if (!response.ok) {
                    throw new Error('Error al cargar los productos');
                }
                const data = await response.json();
                setProductos(data);
            } catch (error) {
                message.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    // Función que se ejecuta al añadir al carrito
    const handleAddToCart = (bicicleta) => {
        // AQUÍ ESTÁ LA CORRECCIÓN: Cambiamos 'Compra' por 'Venta'
        addItem(bicicleta, 'Venta');
    };

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

    return (
        <div>
            <Title level={2}>Catálogo de Bicicletas en Venta</Title>
            <Row gutter={[16, 24]} justify="center">
                {productos.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={item.nombre} src={imageMap[item.imagen]} style={{ height: 200, objectFit: 'contain' }} />}
                            actions={[
                                <Button 
                                    type="primary" 
                                    onClick={() => handleAddToCart(item)}
                                    disabled={item.stock === 0}
                                >
                                    {item.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                                </Button>
                            ]}
                        >
                            <Meta
                                title={item.nombre}
                                description={item.descripcion}
                            />
                            <Text strong style={{ fontSize: '1.2em', marginTop: '10px', display: 'block' }}>
                                ${new Intl.NumberFormat('es-CL').format(item.precio)}
                            </Text>
                            <Tag color={item.stock > 0 ? 'green' : 'red'} style={{ marginTop: '10px' }}>
                                Stock: {item.stock}
                            </Tag>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default PurchasePage;
