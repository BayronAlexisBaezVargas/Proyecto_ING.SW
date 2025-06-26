// frontend/src/pages/RegisterPage.js

import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Excluimos 'confirm' del objeto a enviar al backend
        const { confirm, ...dataToSend } = values;
        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error en el registro.');
            }
            
            // 1. Mostramos un mensaje de éxito que dura 2 segundos.
            message.success('¡Cuenta creada exitosamente!', 2);
            
            // 2. Esperamos 2 segundos antes de redirigir al login.
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            message.error(error.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Crear una Cuenta</Title>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="nombre" label="Nombre Completo" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="rut" label="RUT" rules={[{ required: true }]}>
                    <Input placeholder="12345678-9" />
                </Form.Item>
                <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Contraseña" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirmar Contraseña"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: '¡Por favor confirma tu contraseña!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('¡Las dos contraseñas que ingresaste no coinciden!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="telefono" label="Teléfono">
                    <Input />
                </Form.Item>
                <Form.Item name="direccion" label="Dirección">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Crear Cuenta</Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></div>
            </Form>
        </div>
    );
};

export default RegisterPage;

