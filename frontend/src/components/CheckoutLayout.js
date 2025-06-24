// frontend/src/components/CheckoutLayout.js
import React from 'react';
import { Layout, Button, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const CheckoutLayout = ({ children }) => {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ margin: 0 }}>MasterBikes Checkout</Title>
                    </Col>
                    <Col>
                        <Button onClick={() => navigate(-1)}>Volver</Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '24px 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {children}
                </div>
            </Content>
        </Layout>
    );
};

export default CheckoutLayout;