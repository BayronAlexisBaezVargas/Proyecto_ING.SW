// frontend/src/pages/CheckoutPage.js
import React from 'react';
import { useCart } from '../context/CartContext';
// AQUÍ ESTÁ LA CORRECCIÓN: Añadimos 'Space' a la lista de importaciones
import { List, Button, Typography, InputNumber, Row, Col, Divider, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CheckoutPage = () => {
    const { cartItems, updateItemDays, total } = useCart();
    const navigate = useNavigate();

    return (
        <div>
            <Title level={2}>Resumen de tu Pedido</Title>
            <List
                itemLayout="vertical"
                dataSource={cartItems}
                renderItem={item => (
                    <List.Item key={item.id}>
                        <Row align="middle" gutter={16}>
                            <Col span={12}>
                                <Title level={5}>{item.nombre}</Title>
                                <Text type="secondary">{item.type}</Text>
                            </Col>
                            <Col span={6}>
                                {item.type === 'Arriendo' && (
                                    <Space>
                                        <Text>Días:</Text>
                                        <InputNumber
                                            min={1}
                                            defaultValue={item.days || 1}
                                            onChange={(value) => updateItemDays(item.id, value)}
                                        />
                                    </Space>
                                )}
                            </Col>
                            <Col span={6} style={{ textAlign: 'right' }}>
                                <Text strong>${new Intl.NumberFormat('es-CL').format(item.price * (item.days || 1))}</Text>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
            <Divider />
            <Row justify="end">
                <Col>
                    <Title level={3}>Total: ${new Intl.NumberFormat('es-CL').format(total)}</Title>
                </Col>
            </Row>
            <Row justify="end" style={{ marginTop: '24px' }}>
                <Col>
                    <Button type="primary" size="large" onClick={() => navigate('/payment')}>
                        Continuar al Pago
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default CheckoutPage;
