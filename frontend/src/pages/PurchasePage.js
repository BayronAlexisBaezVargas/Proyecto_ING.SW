// frontend/src/pages/PurchasePage.js

import React from 'react';
import { List, Card, Button, Typography, message } from 'antd';

// Importamos las imágenes locales para la venta
import imgMontana from '../assets/images/bici_montana.jpg';
import imgUrbana from '../assets/images/bici_urbana.jpg';
import imgRuta from '../assets/images/bici_ruta.jpg';
import imgElectrica from '../assets/images/bici_electrica.jpg';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

// Datos de ejemplo para las bicicletas en venta
const bicicletasEnVenta = [
  {
    id: 'B-001',
    nombre: 'Bicicleta de Montaña Pro',
    descripcion: 'Aro 29, 21 velocidades, cuadro de aluminio ligero.',
    precio: '$349.990',
    imagen: imgMontana,
  },
  {
    id: 'B-002',
    nombre: 'Bicicleta Urbana Clásica',
    descripcion: 'Diseño retro, canasto frontal, ideal para paseos por la ciudad.',
    precio: '$229.990',
    imagen: imgUrbana,
  },
  {
    id: 'B-003',
    nombre: 'Bicicleta de Ruta Veloz',
    descripcion: 'Ultra liviana, componentes de carbono, para máxima velocidad.',
    precio: '$799.990',
    imagen: imgRuta,
  },
  {
    id: 'B-004',
    nombre: 'Bicicleta Eléctrica Plegable',
    descripcion: 'Compacta y potente, perfecta para el transporte multimodal.',
    precio: '$950.000',
    imagen: imgElectrica,
  },
];

const PurchasePage = () => {
  const handleCompra = (bicicleta) => {
    console.log('Comprando:', bicicleta);
    message.success(`¡Has comprado la ${bicicleta.nombre} con éxito!`);
  };

  return (
    <div>
      <Title level={2}>Catálogo de Bicicletas en Venta</Title>
      <Paragraph>Explora nuestra selección de bicicletas de alta calidad listas para ti.</Paragraph>
      
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
        }}
        dataSource={bicicletasEnVenta}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              // AQUÍ ESTÁ LA CORRECCIÓN: objectFit cambiado a 'contain'
              cover={<img alt={item.nombre} src={item.imagen} style={{ height: 200, objectFit: 'contain' }} />}
              actions={[
                <Button type="primary" onClick={() => handleCompra(item)}>
                  Comprar
                </Button>
              ]}
            >
              <Meta
                title={`${item.nombre} - ${item.precio}`}
                description={item.descripcion}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PurchasePage;
