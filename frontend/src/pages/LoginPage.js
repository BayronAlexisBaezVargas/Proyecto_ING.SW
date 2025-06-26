// frontend/src/pages/LoginPage.js

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            // 1. Leemos el cuerpo de la respuesta como JSON.
            const data = await response.json();

            // 2. Revisamos si la propiedad 'ok' de la respuesta es 'false'.
            //    Esto captura errores como 401 (contraseña incorrecta) o 409 (conflicto).
            if (!response.ok) {
                // Si no es 'ok', lanzamos un error usando el mensaje del backend.
                // Esto detiene la ejecución y pasa al bloque 'catch'.
                throw new Error(data.message || 'Ocurrió un error inesperado.');
            }
            
            // Si la respuesta FUE exitosa (código 200-299):
            login(data.user);
            localStorage.setItem('token', data.token);

            message.success('Inicio de sesión exitoso.');
            navigate('/');

        } catch (error) {
            // 3. El bloque 'catch' ahora recibirá el error que lanzamos manualmente.
            //    Mostramos el mensaje de error (ej: "Contraseña errónea...")
            message.error(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Iniciar Sesión</Title>
            <Form onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input prefix={<MailOutlined />} placeholder="Correo Electrónico" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Ingresar</Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link></div>
            </Form>
        </div>
    );
};

export default LoginPage;
