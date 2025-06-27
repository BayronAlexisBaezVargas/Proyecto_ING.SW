// frontend/src/pages/PaymentPage.js

import React from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 1. Importamos el hook del carrito

const { Title } = Typography;

const PaymentPage = () => {
    const navigate = useNavigate();
    // 2. Obtenemos los items del carrito, el total y la función para limpiar
    const { cartItems, total, clearCart } = useCart();

    const onFinish = async (values) => {
        console.log('Datos de pago (simulado):', values);
        
        // 3. Obtenemos el token del usuario para autenticar la petición
        const token = localStorage.getItem('token');
        if (!token) {
            message.error('No has iniciado sesión. No se puede procesar la compra.');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/compras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // 4. Enviamos el token para la autenticación
                },
                // 5. Enviamos la lista de items y el total en el cuerpo de la petición
                body: JSON.stringify({ items: cartItems, total }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Si el backend responde con un error (ej: falta de stock), lo mostramos
                throw new Error(data.message || 'Error al procesar la compra.');
            }

            // Si todo fue exitoso...
            message.success('¡Pago procesado con éxito! Gracias por tu compra.', 3);
            clearCart();
            
            setTimeout(() => {
                navigate('/thank-you');
            }, 3000);

        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div>
            <Title level={2}>Ingresa tus Datos de Pago</Title>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Nombre en la Tarjeta" name="cardName" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Número de la Tarjeta" name="cardNumber" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Fecha de Expiración (MM/AA)" name="expiryDate" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="CVC" name="cvc" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large">
                        Pagar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PaymentPage;
