// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

// Importación de nuestro proveedor de autenticación
import { AuthProvider } from './context/AuthContext';

// Importación de componentes de la interfaz
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

// Importación de todas las páginas creadas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import RentalsPage from './pages/RentalsPage';
import RepairsPage from './pages/RepairsPage';
import StockManagementPage from './pages/StockManagementPage';
import PurchasePage from './pages/PurchasePage';
import RepairRequestsPage from './pages/RepairRequestsPage';

// Importación de los estilos de Ant Design
import 'antd/dist/reset.css';

const { Content } = Layout;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <AppHeader />
          <Content style={{ padding: '0 50px', marginTop: 64, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 380, width: '100%', maxWidth: '1200px' }}>
              {/* Aquí se definen todas las rutas de la aplicación */}
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                {/* Rutas para clientes */}
                <Route path="/comprar-bicicletas" element={<PurchasePage />} />
                <Route path="/arriendos" element={<RentalsPage />} />
                <Route path="/reparaciones" element={<RepairsPage />} />
                
                {/* Rutas para administradores */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/stock" element={<StockManagementPage />} />
                <Route path="/admin/reparaciones" element={<RepairRequestsPage />} />
              </Routes>
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

