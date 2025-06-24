// frontend/src/components/CartDrawer.js
import React from 'react';
import { Drawer, List, Button, Typography, Space, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const { Title } = Typography;

const CartDrawer = () => {
    const { isCartVisible, closeCart, cartItems, removeItem, total } = useCart();
    const navigate = useNavigate(); // Hook para navegar

    const handleCheckout = () => {
        closeCart(); // Cierra el carrito
        navigate('/checkout'); // Navega a la página de checkout
    };

    return (
        <Drawer
            title="Tu Carrito"
            placement="right"
            onClose={closeCart}
            visible={isCartVisible}
            width={400}
        >
            {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <Title level={4}>Tu cesta está vacía.</Title>
                </div>
            ) : (
                <Space direction="vertical" style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={cartItems}
                        renderItem={item => (
                            <List.Item
                                actions={[<Button type="text" icon={<DeleteOutlined />} onClick={() => removeItem(item.id)} danger />]}
                            >
                                <List.Item.Meta
                                    title={`${item.nombre} (${item.type})`}
                                    description={`$${new Intl.NumberFormat('es-CL').format(item.price)}`}
                                />
                            </List.Item>
                        )}
                    />
                    <div>
                        <Row justify="space-between" align="middle" style={{ marginTop: '20px' }}>
                            <Col>
                                <Title level={4}>Total (aprox):</Title>
                            </Col>
                            <Col>
                                <Title level={4}>${new Intl.NumberFormat('es-CL').format(total)}</Title>
                            </Col>
                        </Row>
                        <Button type="primary" block size="large" onClick={handleCheckout}>
                            Ir a Pagar
                        </Button>
                    </div>
                </Space>
            )}
        </Drawer>
    );
};

export default CartDrawer;
