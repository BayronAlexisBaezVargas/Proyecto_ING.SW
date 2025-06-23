// frontend/src/pages/RegisterPage.js
import React, { useState } from 'react'; // 1. Importamos 'useState'
import { Form, Input, Button, Typography, Radio } from 'antd'; // 2. Importamos 'Radio' de Ant Design
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  // 3. Creamos un estado para guardar el rol seleccionado ('user' o 'admin')
  const [role, setRole] = useState('user'); 

  const onFinish = (values) => {
    // El objeto 'values' ahora contendrá todos los campos del formulario
    console.log('Datos de registro recibidos:', values);
    alert(`Usuario '${values.name}' registrado como '${values.role}'. Redirigiendo a Login.`);
    // Por ahora, solo redirigimos a la página de login
    navigate('/login');
  };

  // Función que se ejecuta cuando cambia la selección de rol
  const onRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Crear una Cuenta</Title>
      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ role: 'user' }} // Valor inicial del rol en el formulario
      >
        {/* 4. Campo para seleccionar el tipo de rol */}
        <Form.Item name="role" label="Tipo de Cuenta" rules={[{ required: true }]}>
          <Radio.Group onChange={onRoleChange} value={role}>
            <Radio value="user">Cliente</Radio>
            <Radio value="admin">Administrador</Radio>
          </Radio.Group>
        </Form.Item>

        {/* --- Campos Comunes --- */}
        <Form.Item name="name" label="Nombre Completo" rules={[{ required: true, message: 'Ingresa tu nombre' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Dirección" rules={[{ required: true, message: 'Ingresa tu dirección' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Teléfono" rules={[{ required: true, message: 'Ingresa tu teléfono' }]}>
          <Input />
        </Form.Item>

        {/* 5. Campo condicional que solo aparece si el rol es 'admin' */}
        {role === 'admin' && (
          <Form.Item
            name="adminCode"
            label="Código de Administrador"
            rules={[{ required: true, message: 'El código de administrador es obligatorio' }]}
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