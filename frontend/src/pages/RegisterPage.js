// frontend/src/pages/RegisterPage.js

import React, { useState } from 'react';
import { Form, Input, Button, Typography, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('user');

    const onFinish = (values) => {
        console.log('Datos de registro recibidos:', values);
        alert(`Usuario '${values.name}' registrado como '${values.role}'. Redirigiendo a Login.`);
        navigate('/login');
    };

    const onRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '50px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Crear una Cuenta</Title>
            <Form
                name="register"
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ role: 'user' }}
            >
                <Form.Item name="role" label="Tipo de Cuenta" rules={[{ required: true }]}>
                    <Radio.Group onChange={onRoleChange} value={role}>
                        <Radio value="user">Cliente</Radio>
                        <Radio value="admin">Administrador</Radio>
                    </Radio.Group>
                </Form.Item>
                
                <Form.Item name="name" label="Nombre Completo" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
                    <Input />
                </Form.Item>

                {/* --- NUEVO CAMPO PARA EL RUT --- */}
                <Form.Item
                    name="rut"
                    label="RUT"
                    rules={[{ required: true, message: 'Por favor, ingresa tu RUT' }]}
                >
                    <Input placeholder="Ej: 12345678-9" />
                </Form.Item>

                <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}>
                    <Input />
                </Form.Item>
                
                <Form.Item name="address" label="Dirección" rules={[{ required: true, message: 'Ingresa tu dirección' }]}>
                    <Input placeholder="Ej: Av. Siempreviva 742" />
                </Form.Item>
                <Form.Item name="phone" label="Teléfono" rules={[{ required: true, message: 'Ingresa tu teléfono' }]}>
                    <Input placeholder="Ej: 9 1234 5678" />
                </Form.Item>

                {role === 'admin' && (
                    <Form.Item
                        name="adminCode"
                        label="Código de Administrador"
                        rules={[{ required: true, message: 'El código es obligatorio' }]}
                    >
                        <Input.Password placeholder="Ingresa el código secreto" />
                    </Form.Item>
                )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Crear Cuenta
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center' }}>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
                </div>
            </Form>
        </div>
    );
};

export default RegisterPage;
