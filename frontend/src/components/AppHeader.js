// frontend/src/components/AppHeader.js

import React from 'react';
import { Layout, Menu, Badge } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const { Header } = Layout;

const AppHeader = () => {
    const { user, isLoggedIn, logout } = useAuth();
    const { cartItems, openCart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <Menu theme="dark" mode="horizontal" selectable={false}>
                {/* ... (Menús de invitado y admin se mantienen igual) ... */}
                {!isLoggedIn ? (
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="login"><Link to="/login">Iniciar Sesión</Link></Menu.Item>
                        <Menu.Item key="register"><Link to="/register">Registrarse</Link></Menu.Item>
                    </>
                ) : user.role === 'admin' ? (
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="admin"><Link to="/admin">Dashboard Admin</Link></Menu.Item>
                        <Menu.Item key="stock"><Link to="/admin/stock">Gestionar Stock</Link></Menu.Item>
                        <Menu.Item key="repairs"><Link to="/admin/reparaciones">Solicitudes de Reparación</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Cerrar Sesión</Menu.Item>
                    </>
                ) : (
                    // Menú específico para Clientes
                    <>
                        <Menu.Item key="home"><Link to="/">Inicio</Link></Menu.Item>
                        <Menu.Item key="buy"><Link to="/comprar-bicicletas">Comprar Bicicletas</Link></Menu.Item>
                        <Menu.Item key="rent"><Link to="/arriendos">Arriendo de Bicicletas</Link></Menu.Item>
                        <Menu.Item key="repair"><Link to="/reparaciones">Solicitar Reparación</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={handleLogout} style={{ marginLeft: 'auto' }}>Cerrar Sesión</Menu.Item>
                        
                        <Menu.Item key="cart" onClick={openCart}>
                            <Badge count={cartItems.length} size="small">
                                {/* AQUÍ ESTÁ EL CAMBIO: añadimos color: 'white' */}
                                <ShoppingCartOutlined style={{ fontSize: '20px', color: 'white' }} />
                            </Badge>
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </Header>
    );
};

export default AppHeader;
