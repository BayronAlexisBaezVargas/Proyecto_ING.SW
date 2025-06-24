// frontend/src/components/AuthLayout.js
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const AuthLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                backgroundColor: 'black', // Fondo negro que ocupa todo
                backgroundImage: "url('/logo_masterbikes.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain'
            }}>
                {children} {/* Aquí se renderizará el formulario de login o registro */}
            </Content>
        </Layout>
    );
};

export default AuthLayout;
