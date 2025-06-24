// frontend/src/pages/HomePage.js

import React from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Importamos las imágenes que usaremos en las tarjetas
import imgCompra from '../assets/images/bici_montana.jpg';
import imgArriendo from '../assets/images/arriendo_urbana.jpg';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const HomePage = () => {
    const { isLoggedIn, user } = useAuth();

    // --- Vista para Cliente Logueado ---
    const renderClienteHome = () => (
        <div style={{ textAlign: 'center' }}>
            {/* Usamos la ruta directa desde 'public' para el logo principal */}
            <img src="/logo_masterbikes.png" alt="Logo de MasterBikes" style={{ width: '120px', marginBottom: '20px' }} />
            <Title level={2}>
                Bienvenido de vuelta, {user.name}
            </Title>
            <Paragraph style={{ fontSize: '1.2em' }}>
                ¿Qué aventura te espera hoy?
            </Paragraph>
            <Row gutter={[24, 24]} justify="center" style={{ marginTop: '40px' }}>
                <Col xs={24} md={10}>
                    <Card
                        hoverable
                        cover={<img alt="Comprar Bicicletas" src={imgCompra} style={{ height: 250, objectFit: 'contain' }} />}
                        actions={[
                            <Link to="/comprar-bicicletas">
                                <Button type="primary" size="large">Ver Catálogo de Venta</Button>
                            </Link>
                        ]}
                    >
                        <Meta
                            title={<Title level={4}>Comprar una Bicicleta</Title>}
                            description="Encuentra tu compañera de ruta perfecta. Modelos nuevos listos para ser tuyos."
                        />
                    </Card>
                </Col>
                <Col xs={24} md={10}>
                    <Card
                        hoverable
                        cover={<img alt="Arrendar Bicicletas" src={imgArriendo} style={{ height: 250, objectFit: 'contain' }} />}
                        actions={[
                            <Link to="/arriendos">
                                <Button type="primary" size="large">Ver Catálogo de Arriendo</Button>
                            </Link>
                        ]}
                    >
                        <Meta
                            title={<Title level={4}>Arrendar una Bicicleta</Title>}
                            description="La bicicleta ideal para cada ocasión, por el tiempo que la necesites."
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );

    // --- Vista para Administrador Logueado ---
    const renderAdminHome = () => (
        <div style={{ textAlign: 'center' }}>
            <img src="/logo_masterbikes.png" alt="Logo de MasterBikes" style={{ width: '120px', marginBottom: '20px' }} />
            <Title>Bienvenido administrador, {user.name}</Title>
            <Paragraph>
                Desde aquí puedes gestionar la plataforma. Utiliza el menú de navegación para acceder a las diferentes secciones.
            </Paragraph>
        </div>
    );

    // --- Vista para Visitantes (No logueados) ---
    const renderVisitanteHome = () => (
        <div style={{ textAlign: 'center' }}>
             <img src="/logo_masterbikes.png" alt="Logo de MasterBikes" style={{ width: '120px', marginBottom: '20px' }} />
            <Title>Bienvenido a MasterBikes</Title>
            <Paragraph style={{ fontSize: '1.1em' }}>
                <Link to="/login">Inicia sesión</Link> o <Link to="/register">crea una cuenta</Link> para comprar nuestros productos o gestionar los datos de administrador.
            </Paragraph>
        </div>
    );
    
    // Decidimos qué vista mostrar
    if (isLoggedIn) {
        return user.role === 'admin' ? renderAdminHome() : renderClienteHome();
    } else {
        return renderVisitanteHome();
    }
};

export default HomePage;
