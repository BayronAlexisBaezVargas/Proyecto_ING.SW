// frontend/src/pages/PurchasePage.js

import React from 'react';
import { Card, Button, Typography, Row, Col } from 'antd';
import { useCart } from '../context/CartContext'; // 1. Importamos el hook del carrito

// Importamos las imágenes locales
import imgMontana from '../assets/images/bici_montana.jpg';
import imgUrbana from '../assets/images/bici_urbana.jpg';
import imgRuta from '../assets/images/bici_ruta.jpg';
import imgElectrica from '../assets/images/bici_electrica.jpg';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const bicicletasEnVenta = [
  { id: 'B-001', nombre: 'Bicicleta de Montaña Pro', descripcion: 'Aro 29, 21 velocidades, cuadro de aluminio ligero.', precio: '$349.990', imagen: imgMontana },
  { id: 'B-002', nombre: 'Bicicleta Urbana Clásica', descripcion: 'Diseño retro, canasto frontal, ideal para paseos por la ciudad.', precio: '$229.990', imagen: imgUrbana },
  { id: 'B-003', nombre: 'Bicicleta de Ruta Veloz', descripcion: 'Ultra liviana, componentes de carbono, para máxima velocidad.', precio: '$799.990', imagen: imgRuta },
  { id: 'B-004', nombre: 'Bicicleta Eléctrica Plegable', descripcion: 'Compacta y potente, perfecta para el transporte multimodal.', precio: '$950.000', imagen: imgElectrica },
];

const PurchasePage = () => {
  // 2. Obtenemos la función para añadir items del contexto
  const { addItem } = useCart();

  // 3. La función ahora usa addItem para agregar el producto al carrito
  const handleCompra = (bicicleta) => {
    addItem(bicicleta, 'Compra');
  };

  return (
    <div>
      <Title level={2}>Catálogo de Bicicletas en Venta</Title>
      <Paragraph>Explora nuestra selección de bicicletas de alta calidad listas para ti.</Paragraph>
      
      <Row gutter={[16, 24]} justify="center">
        {bicicletasEnVenta.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={item.nombre} src={item.imagen} style={{ height: 200, objectFit: 'contain' }} />}
              actions={[<Button type="primary" onClick={() => handleCompra(item)}>Añadir al Carrito</Button>]}
            >
              <Meta
                title={`${item.nombre} - ${item.precio}`}
                description={item.descripcion}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PurchasePage;
