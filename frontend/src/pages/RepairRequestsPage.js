// frontend/src/pages/RepairRequestsPage.js

import React, { useState } from 'react';
import { Table, Button, Modal, Form, DatePicker, message, Typography, Space, Input } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;
const { TextArea } = Input;

const initialRepairRequests = [
  { key: '1', cliente: 'Carlos Araya', email: 'carlos.a@correo.com', tipoBicicleta: 'Montaña', descripcion: 'El freno delantero no funciona bien.' },
  { key: '2', cliente: 'Beatriz Soto', email: 'bea.soto@correo.com', tipoBicicleta: 'Urbana', descripcion: 'La llanta trasera está pinchada.' },
  { key: '3', cliente: 'Roberto Diaz', email: 'robert.d@correo.com', tipoBicicleta: 'Ruta', descripcion: 'El cambio de marchas no es preciso.' },
];

// --- Funciones para limitar horario (sin cambios) ---
const disabledDate = (current) => current && (current.day() === 0 || current.day() === 6);
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) result.push(i);
  return result;
};
const disabledTime = () => ({
  disabledHours: () => [...range(0, 8), ...range(20, 24)],
});

const RepairRequestsPage = () => {
  const [requests, setRequests] = useState(initialRepairRequests);
  
  // Estados para el modal de AGENDAR
  const [isAgendaModalVisible, setIsAgendaModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // 1. Nuevos estados para el modal de RECHAZAR
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  
  const [agendaForm] = Form.useForm();
  const [rejectForm] = Form.useForm();

  // --- Lógica para AGENDAR ---
  const showAgendaModal = (record) => {
    setSelectedRequest(record);
    setIsAgendaModalVisible(true);
  };
  
  const handleAgendaSubmit = (values) => {
    const { fechaReparacion } = values;
    const fechaFormateada = fechaReparacion.format('DD/MM/YYYY');
    const horaFormateada = fechaReparacion.format('HH:mm');
    message.success(`Correo de confirmación enviado a ${selectedRequest.email} para el día ${fechaFormateada} a las ${horaFormateada} hrs.`);
    setRequests(prev => prev.filter(req => req.key !== selectedRequest.key));
    setIsAgendaModalVisible(false);
    agendaForm.resetFields();
  };
  
  // --- 2. Nueva lógica para RECHAZAR ---
  const showRejectModal = (record) => {
    setSelectedRequest(record);
    setIsRejectModalVisible(true);
  };
  
  const handleRejectSubmit = (values) => {
    const { motivoRechazo } = values;
    console.log(`Rechazando solicitud de ${selectedRequest.cliente}. Motivo:`, motivoRechazo);
    message.info(`Correo de rechazo enviado a ${selectedRequest.email} explicando el motivo.`);
    setRequests(prev => prev.filter(req => req.key !== selectedRequest.key));
    setIsRejectModalVisible(false);
    rejectForm.resetFields();
  };

  const handleModalCancel = () => {
    setIsAgendaModalVisible(false);
    setIsRejectModalVisible(false);
  };

  // --- 3. Actualización de las columnas de la tabla ---
  const columns = [
    { title: 'Cliente', dataIndex: 'cliente', key: 'cliente' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Tipo de Bicicleta', dataIndex: 'tipoBicicleta', key: 'tipoBicicleta' },
    { title: 'Descripción del Problema', dataIndex: 'descripcion', key: 'descripcion' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showAgendaModal(record)}>
            Agendar
          </Button>
          <Button type="primary" danger onClick={() => showRejectModal(record)}>
            Rechazar
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Solicitudes de Reparación Pendientes</Title>
      <Table columns={columns} dataSource={requests} />

      {/* Modal para AGENDAR (sin cambios) */}
      <Modal
        title={`Agendar Reparación para: ${selectedRequest?.cliente}`}
        visible={isAgendaModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={agendaForm} layout="vertical" onFinish={handleAgendaSubmit}>
          <Form.Item name="fechaReparacion" label="Selecciona la fecha y hora" rules={[{ required: true, message: 'Por favor, selecciona una fecha y hora.' }]}>
            <DatePicker format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} disabledTime={disabledTime} showTime={{ defaultValue: dayjs('08:00', 'HH:mm') }} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Aceptar y Notificar</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleModalCancel}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 4. Nuevo Modal para RECHAZAR */}
      <Modal
        title={`Rechazar Solicitud de: ${selectedRequest?.cliente}`}
        visible={isRejectModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form form={rejectForm} layout="vertical" onFinish={handleRejectSubmit}>
          <Form.Item
            name="motivoRechazo"
            label="Escribe el motivo del rechazo"
            rules={[{ required: true, message: 'Debes explicar por qué se rechaza la solicitud.' }]}
          >
            <TextArea rows={4} placeholder="Ej: No contamos con los repuestos necesarios para este modelo." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" danger>Rechazar y Notificar</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleModalCancel}>Cancelar</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default RepairRequestsPage;
