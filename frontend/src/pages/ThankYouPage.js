// frontend/src/pages/ThankYouPage.js

import React from 'react';
import { Button, Result, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

// 1. ELIMINAMOS la línea 'import logo from ...'
// Ya no la necesitamos porque llamaremos al logo directamente.

const { Title } = Typography;

const ThankYouPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            {/* 2. En la etiqueta <img>, usamos la ruta directa desde 'public' */}
            <img src="/logo_masterbikes.png" alt="Logo de MasterBikes" style={{ width: '100px', marginBottom: '24px' }} />
            
            <Result
                status="success"
                title={<Title level={2}>¡Gracias por tu compra!</Title>}
                subTitle="Tu pedido ha sido procesado con éxito. Pronto recibirás un correo con los detalles."
                extra={[
                    <Button type="primary" key="console" onClick={() => navigate('/')}>
                        Volver al Inicio
                    </Button>,
                ]}
            />
        </div>
    );
};

export default ThankYouPage;

