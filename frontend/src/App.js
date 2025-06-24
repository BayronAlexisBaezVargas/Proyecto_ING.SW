// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

// Proveedores de Contexto
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Componentes y Layouts
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import CartDrawer from './components/CartDrawer';
import CheckoutLayout from './components/CheckoutLayout';

// Páginas
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

import 'antd/dist/reset.css';

const { Content } = Layout;

// Layout Principal: Con menú de navegación, pie de página y carrito.
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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
            <Routes>
                {/* Rutas para el proceso de pago (sin menú principal) */}
                <Route path="/checkout" element={<CheckoutLayout><CheckoutPage /></CheckoutLayout>} />
                <Route path="/payment" element={<CheckoutLayout><PaymentPage /></CheckoutLayout>} />
                <Route path="/thank-you" element={<CheckoutLayout><ThankYouPage /></CheckoutLayout>} />
                
                {/* Todas las demás rutas usarán el MainLayout */}
                <Route path="/*" element={<MainLayout><MainRoutes /></MainLayout>} />
            </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

// Componente para agrupar las rutas que van dentro del MainLayout
const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/comprar-bicicletas" element={<PurchasePage />} />
        <Route path="/arriendos" element={<RentalsPage />} />
        <Route path="/reparaciones" element={<RepairsPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/stock" element={<StockManagementPage />} />
        <Route path="/admin/reparaciones" element={<RepairRequestsPage />} />
    </Routes>
);

export default App;
