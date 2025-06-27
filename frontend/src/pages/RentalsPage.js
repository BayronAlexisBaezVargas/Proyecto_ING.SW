// frontend/src/pages/RentalsPage.js
import React, { useState, useEffect } from 'react';
import { Card, Button, Typography, Row, Col, Spin, Tag, message, Space } from 'antd';
import { useCart } from '../context/CartContext';

// Importamos las 8 imágenes que guardaste en la carpeta de assets
import imgPaseo from '../assets/images/arriendo_paseo.jpg';
import imgUrbana from '../assets/images/arriendo_urbana.jpg';
import imgElectrica from '../assets/images/arriendo_electrica.jpg';
import imgNino from '../assets/images/arriendo_nino.jpg';
import imgTandem from '../assets/images/arriendo_tandem.jpg';
import imgGravel from '../assets/images/arriendo_gravel.jpg';
import imgPlegable from '../assets/images/arriendo_plegable.jpg';
import imgFatbike from '../assets/images/arriendo_fatbike.jpg';

const { Title, Paragraph, Text } = Typography;

// Mapa para asociar el nombre del archivo de la BD con la imagen importada
const imageMap = {
    'arriendo_paseo.jpg': imgPaseo,
    'arriendo_urbana.jpg': imgUrbana,
    'arriendo_electrica.jpg': imgElectrica,
    'arriendo_nino.jpg': imgNino,
    'arriendo_tandem.jpg': imgTandem,
    'arriendo_gravel.jpg': imgGravel,
    'arriendo_plegable.jpg': imgPlegable,
    'arriendo_fatbike.jpg': imgFatbike,
};

const RentalsPage = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Llamamos a la API pidiendo productos de tipo 'Arriendo'
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/productos?tipo=Arriendo`);
                if (!response.ok) {
                    throw new Error('Error al cargar las bicicletas de arriendo');
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

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

    return (
        <div>
            <Title level={2}>Arriendo de Bicicletas</Title>
            <Paragraph>Elige la bicicleta perfecta para tu próxima aventura. Precios por día.</Paragraph>
            <Row gutter={[16, 24]} justify="center">
                {productos.map((item) => (
                    <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            cover={<img alt={item.nombre} src={imageMap[item.imagen]} style={{ height: 200, objectFit: 'contain' }} />}
                            actions={[
                                <Button 
                                    type="primary" 
                                    onClick={() => addItem(item, 'Arriendo')}
                                    disabled={item.stock === 0}
                                >
                                    {item.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
                                </Button>
                            ]}
                        >
                            <Title level={5}>{item.nombre}</Title>
                            <Space direction="vertical">
                                <Text strong style={{ fontSize: '1.2em' }}>${new Intl.NumberFormat('es-CL').format(item.precio)} / día</Text>
                                <Tag color={item.stock > 0 ? 'green' : 'red'}>Disponibles: {item.stock}</Tag>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default RentalsPage;
