import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Title } = Typography;

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    const onFinish = (values) => {
        const userData = {
            name: values.email, // Usamos el email como nombre para la simulación
            role: isAdmin ? 'admin' : 'user'
        };
        
        login(userData);
        navigate('/');
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Iniciar Sesión</Title>
            <Form name="normal_login" onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, message: 'Ingresa un correo' }]}>
                    <Input prefix={<MailOutlined />} placeholder="Correo Electrónico (será tu nombre)" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Ingresa tu contraseña' }]}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                </Form.Item>
                <Form.Item>
                    <Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>
                        Soy Administrador
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Ingresar</Button>
                </Form.Item>
                {/* Aquí está el cambio que pediste */}
                <div style={{ textAlign: 'center' }}>
                    ¿No tienes una cuenta? <Link to="/register">Crea una aquí</Link>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;