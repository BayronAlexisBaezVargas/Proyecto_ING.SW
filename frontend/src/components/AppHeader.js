// frontend/src/components/AppHeader.js

import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const { Header } = Layout;

const AppHeader = () => {
    // Obtenemos los datos y funciones del contexto de autenticación
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    // Función para manejar el cierre de sesión y redirigir al login
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" selectable={false}>
                {/* Menú para usuarios no logueados (invitados) */}
                {!isLoggedIn && (
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="login"><Link to="/login">Iniciar Sesión</Link></Menu.Item>
                        <Menu.Item key="register"><Link to="/register">Registrarse</Link></Menu.Item>
                    </>
                )}

                {/* Menú para usuarios logueados */}
                {isLoggedIn && user.role === 'admin' && (
                    // Menú específico para Administradores
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="admin"><Link to="/admin">Dashboard Admin</Link></Menu.Item>
                        <Menu.Item key="stock"><Link to="/admin/stock">Gestionar Stock</Link></Menu.Item>
                        <Menu.Item key="repairs"><Link to="/admin/reparaciones">Solicitudes de Reparación</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Cerrar Sesión</Menu.Item>
                    </>
                )}

                {isLoggedIn && user.role === 'user' && (
                    // Menú específico para Clientes
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="buy"><Link to="/comprar-bicicletas">Comprar Bicicletas</Link></Menu.Item>
                        <Menu.Item key="rent"><Link to="/arriendos">Arriendo de Bicicletas</Link></Menu.Item>
                        <Menu.Item key="repair"><Link to="/reparaciones">Solicitar Reparación</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Cerrar Sesión</Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
};

export default AppHeader;