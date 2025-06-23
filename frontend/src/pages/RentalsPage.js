// frontend/src/pages/RentalsPage.js

import React from 'react';
import { List, Card, Button, Typography, message, Tag, Space } from 'antd';

// Importamos las 8 imágenes que guardaste en la carpeta de assets
import imgPaseo from '../assets/images/arriendo_paseo.jpg';
import imgUrbana from '../assets/images/arriendo_urbana.jpg';
import imgElectrica from '../assets/images/arriendo_electrica.jpg';
import imgNino from '../assets/images/arriendo_nino.jpg';
import imgTandem from '../assets/images/arriendo_tandem.jpg';
import imgGravel from '../assets/images/arriendo_gravel.jpg';
import imgPlegable from '../assets/images/arriendo_plegable.jpg';
import imgFatbike from '../assets/images/arriendo_fatbike.jpg';

const { Title, Paragraph, Text } = Typography;

// Datos de ejemplo para las 8 bicicletas en arriendo
const bicicletasEnArriendo = [
  {
    id: 'R-001',
    nombre: 'Bicicleta de Paseo Confort',
    especificaciones: ['Canasto frontal', 'Asiento ergonómico', 'Guardabarros'],
    precioPorDia: '10.000',
    imagen: imgPaseo,
  },
  {
    id: 'R-002',
    nombre: 'Bicicleta Urbana Híbrida',
    especificaciones: ['7 velocidades', 'Cuadro ligero', 'Neumáticos mixtos'],
    precioPorDia: '12.000',
    imagen: imgUrbana,
  },
  {
    id: 'R-003',
    nombre: 'Bicicleta Eléctrica Boost',
    especificaciones: ['Motor 250W', 'Autonomía 50km', 'Asistencia al pedaleo'],
    precioPorDia: '25.000',
    imagen: imgElectrica,
  },
  {
    id: 'R-004',
    nombre: 'Bicicleta Infantil Aro 20',
    especificaciones: ['Ruedas de apoyo', 'Freno contrapedal', 'Cubre cadena'],
    precioPorDia: '8.000',
    imagen: imgNino,
  },
  {
    id: 'R-005',
    nombre: 'Bicicleta Tándem (para 2)',
    especificaciones: ['Doble asiento', 'Marco reforzado', 'Ideal para parejas'],
    precioPorDia: '20.000',
    imagen: imgTandem,
  },
  {
    id: 'R-006',
    nombre: 'Bicicleta Gravel Aventura',
    especificaciones: ['Frenos de disco', 'Manillar de ruta', 'Apta para tierra'],
    precioPorDia: '18.000',
    imagen: imgGravel,
  },
  {
    id: 'R-007',
    nombre: 'Bicicleta Plegable City',
    especificaciones: ['Se pliega en 10s', 'Ultra compacta', 'Perfecta para metro'],
    precioPorDia: '15.000',
    imagen: imgPlegable,
  },
  {
    id: 'R-008',
    nombre: 'Fatbike Todo Terreno',
    especificaciones: ['Neumáticos anchos', 'Gran tracción', 'Para arena o nieve'],
    precioPorDia: '22.000',
    imagen: imgFatbike,
  },
];

const RentalsPage = () => {
  // Función que se ejecuta al hacer clic en "Arrendar ya"
  const handleArriendo = (bicicleta) => {
    console.log('Arrendando:', bicicleta);
    message.success(`Solicitud de arriendo para la ${bicicleta.nombre} enviada.`);
  };

  return (
    <div>
      <Title level={2}>Arriendo de Bicicletas</Title>
      <Paragraph>Elige la bicicleta perfecta para tu próxima aventura. Precios por día.</Paragraph>
      
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        dataSource={bicicletasEnArriendo}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              cover={<img alt={item.nombre} src={item.imagen} style={{ height: 200, objectFit: 'contain' }} />}
              actions={[
                <Button type="primary" onClick={() => handleArriendo(item)}>
                  Arrendar ya
                </Button>
              ]}
            >
              <Title level={5}>{item.nombre}</Title>
              <Space direction="vertical">
                <div>
                  {item.especificaciones.map(spec => (
                    <Tag color="blue" key={spec}>{spec}</Tag>
                  ))}
                </div>
                <Text strong style={{ fontSize: '1.2em' }}>
                  ${item.precioPorDia} / día
                </Text>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default RentalsPage;