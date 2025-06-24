// frontend/src/pages/PaymentPage.js

import React from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const { Title } = Typography;

// Función de ayuda para crear una pausa (simula el tiempo de procesamiento)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const PaymentPage = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    // 1. Convertimos la función 'onFinish' a una función 'async'
    const onFinish = async (values) => {
        console.log('Datos de pago (simulado):', values);
        
        // 2. Mostramos un mensaje de carga que no se cierra solo.
        const hideLoadingMessage = message.loading('Procesando pago...', 0);

        try {
            // 3. Simulamos una espera de 1.5 segundos para el procesamiento.
            await sleep(1500);

            // 4. Cerramos manualmente el mensaje de carga.
            hideLoadingMessage();
            
            // 5. Limpiamos el carrito.
            clearCart();
            
            // 6. Finalmente, redirigimos al usuario.
            navigate('/thank-you');

        } catch (error) {
            // En caso de un error, cerramos el mensaje y mostramos una alerta.
            hideLoadingMessage();
            message.error('Hubo un error al procesar el pago. Por favor, intenta de nuevo.');
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
