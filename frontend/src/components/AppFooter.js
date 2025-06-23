import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      MasterBikes ©{new Date().getFullYear()}
    </Footer>
  );
};

export default AppFooter;