// frontend/src/pages/HomePage.js

import React from 'react';
import { Typography } from 'antd';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const HomePage = () => {
    const { isLoggedIn, user } = useAuth();

    return (
        <div style={{ textAlign: 'center' }}>
            <Title>
                {(isLoggedIn && user) ? 
                    `Bienvenido ${user.role === 'admin' ? 'administrador' : 'cliente'} ${user.name}` : 
                    'Bienvenido a MasterBikes'
                }
            </Title>
            
            {isLoggedIn ? (
                <Paragraph>
                    Tu solución integral para el arriendo y mantenimiento de bicicletas.
                </Paragraph>
            ) : (
                <Paragraph style={{ fontSize: '1.1em' }}>
                    <Link to="/login">Inicia sesión</Link> o <Link to="/register">crea una cuenta</Link> para comprar nuestros productos o gestionar los datos de administrador.
                </Paragraph>
            )}
        </div>
    );
};

// Esta es la línea que probablemente faltaba o estaba incorrecta.
// Asegúrate de que esté al final del archivo.
export default HomePage;