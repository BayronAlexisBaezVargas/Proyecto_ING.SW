// frontend/src/pages/RepairsPage.js

import React from 'react';
import { Form, Input, Button, Typography, Select, message } from 'antd';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const RepairsPage = () => {
  const [form] = Form.useForm(); // Hook para controlar el formulario

  // Función que se ejecuta al enviar el formulario
  const onFinish = (values) => {
    console.log('Datos de la solicitud de reparación:', values);
    message.success('Tu solicitud de reparación ha sido enviada con éxito. Te contactaremos pronto.');
    // Limpiamos todos los campos del formulario después de enviarlo
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Title level={2}>Solicitud de Reparación</Title>
      <Paragraph>
        Por favor, completa el siguiente formulario para agendar la reparación de tu bicicleta.
      </Paragraph>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Title level={4}>Tus Datos de Contacto</Title>
        <Form.Item
          name="name"
          label="Nombre Completo"
          rules={[{ required: true, message: 'Por favor, ingresa tu nombre completo' }]}
        >
          <Input placeholder="Ej: Juan Pérez" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}
        >
          <Input placeholder="Ej: juan.perez@correo.com" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[{ required: true, message: 'Ingresa tu número de teléfono' }]}
        >
          <Input placeholder="Ej: 9 1234 5678" />
        </Form.Item>

        <Title level={4}>Detalles de la Reparación</Title>
        <Form.Item
          name="tipoBicicleta"
          label="Tipo de Bicicleta"
          rules={[{ required: true, message: 'Por favor, selecciona el tipo de tu bicicleta' }]}
        >
          <Select placeholder="Selecciona una opción">
            <Option value="montana">Montaña</Option>
            <Option value="ruta">Ruta</Option>
            <Option value="urbana">Urbana / Paseo</Option>
            <Option value="electrica">Eléctrica</Option>
            <Option value="otra">Otra</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción del Problema"
          rules={[{ required: true, message: 'Por favor, describe el problema' }]}
        >
          <Input.TextArea rows={4} placeholder="Ej: La cadena se sale al cambiar de marcha, el freno trasero hace ruido, etc." />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Enviar Solicitud
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RepairsPage;