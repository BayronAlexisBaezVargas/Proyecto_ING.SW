// frontend/src/pages/RepairRequestsPage.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form, DatePicker, message, Typography, Space } from 'antd';
import dayjs from 'dayjs'; // Ant Design usa dayjs, lo importamos para manejar fechas

const { Title } = Typography;

const initialRepairRequests = [
  { key: '1', cliente: 'Carlos Araya', email: 'carlos.a@correo.com', tipoBicicleta: 'Montaña', descripcion: 'El freno delantero no funciona bien.' },
  { key: '2', cliente: 'Beatriz Soto', email: 'bea.soto@correo.com', tipoBicicleta: 'Urbana', descripcion: 'La llanta trasera está pinchada.' },
  { key: '3', cliente: 'Roberto Diaz', email: 'robert.d@correo.com', tipoBicicleta: 'Ruta', descripcion: 'El cambio de marchas no es preciso.' },
];

// --- FUNCIONES PARA LIMITAR EL HORARIO ---

// 1. Función para deshabilitar fechas (Sábados y Domingos)
const disabledDate = (current) => {
  // day() devuelve 0 para Domingo y 6 para Sábado
  return current && (current.day() === 0 || current.day() === 6);
};

// 2. Función para generar un rango de números (ayuda a deshabilitar horas/minutos)
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// 3. Función para deshabilitar horas fuera del horario laboral (8:00 a 19:00)
const disabledTime = () => ({
  disabledHours: () => [...range(0, 8), ...range(20, 24)], // Deshabilita de 00:00 a 07:59 y de 20:00 a 23:59
  // No deshabilitaremos minutos ni segundos para simplificar.
});


// --- COMPONENTE PRINCIPAL ---

const RepairRequestsPage = () => {
  const [requests, setRequests] = useState(initialRepairRequests);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [form] = Form.useForm();

  const showAgendaModal = (record) => {
    setSelectedRequest(record);
    setIsModalVisible(true);
  };

  const handleAgendaSubmit = (values) => {
    const { fechaReparacion } = values;
    // 4. Formateamos la fecha y hora para el mensaje de éxito.
    const fechaFormateada = fechaReparacion.format('DD/MM/YYYY');
    const horaFormateada = fechaReparacion.format('HH:mm');
    
    console.log(`Agendando reparación para ${selectedRequest.cliente} en:`, fechaReparacion.format());
    
    message.success(`Correo enviado a ${selectedRequest.email} para el día ${fechaFormateada} a las ${horaFormateada} hrs.`);
    
    setRequests(prevRequests => prevRequests.filter(req => req.key !== selectedRequest.key));
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Tipo de Bicicleta', dataIndex: 'tipoBicicleta', key: 'tipoBicicleta' },
    { title: 'Descripción del Problema', dataIndex: 'descripcion', key: 'descripcion' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => showAgendaModal(record)}>
          Agendar Reparación
        </Button>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Solicitudes de Reparación Pendientes</Title>
      <Table columns={columns} dataSource={requests} />

      <Modal
        title={`Agendar Reparación para: ${selectedRequest?.cliente}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAgendaSubmit}>
          <Form.Item
            name="fechaReparacion"
            label="Selecciona la fecha y hora para la reparación"
            rules={[{ required: true, message: 'Por favor, selecciona una fecha y hora.' }]}
          >
            {/* 5. Actualizamos el DatePicker con las nuevas propiedades */}
            <DatePicker
              format="YYYY-MM-DD HH:mm"
              disabledDate={disabledDate}
              disabledTime={disabledTime}
              showTime={{ defaultValue: dayjs('08:00', 'HH:mm') }} // Muestra la selección de hora
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Aceptar y Notificar
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default RepairRequestsPage;
