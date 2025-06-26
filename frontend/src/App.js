// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Spin } from 'antd';

// --- Proveedores de Contexto ---
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// --- Componentes y Layouts ---
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import CartDrawer from './components/CartDrawer';
import CheckoutLayout from './components/CheckoutLayout';

// --- Páginas de la Aplicación ---
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PurchasePage from './pages/PurchasePage';
import RentalsPage from './pages/RentalsPage';
import RepairsPage from './pages/RepairsPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminDashboard from './pages/AdminDashboard';
import StockManagementPage from './pages/StockManagementPage';
import RepairRequestsPage from './pages/RepairRequestsPage';

// Estilos globales de Ant Design
import 'antd/dist/reset.css';

const { Content } = Layout;

// --- Definición de Layouts ---
const MainLayout = ({ children }) => (
    <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Content style={{ padding: '24px 50px', marginTop: 64, display: 'flex', justifyContent: 'center' }}>
            <div style={{ background: '#fff', padding: 24, width: '100%', maxWidth: '1200px' }}>
                {children}
            </div>
        </Content>
        <CartDrawer />
        <AppFooter />
    </Layout>
);

const AppRoutes = () => {
    const { loading } = useAuth();

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/checkout" element={<CheckoutLayout><CheckoutPage /></CheckoutLayout>} />
            <Route path="/payment" element={<CheckoutLayout><PaymentPage /></CheckoutLayout>} />
            <Route path="/thank-you" element={<CheckoutLayout><ThankYouPage /></CheckoutLayout>} />
            <Route path="/*" element={<MainLayout><MainRoutes /></MainLayout>} />
        </Routes>
    );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/comprar-bicicletas" element={<PurchasePage />} />
        {/* AQUÍ ESTÁ LA LÍNEA CORREGIDA */}
        <Route path="/arriendos" element={<RentalsPage />} />
        <Route path="/reparaciones" element={<RepairsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/stock" element={<StockManagementPage />} />
        <Route path="/admin/reparaciones" element={<RepairRequestsPage />} />
    </Routes>
);

export default App;
