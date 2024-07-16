// src/Layout/WithSimpleLayout.tsx
import React from 'react';
import { Layout } from 'antd';
import CustomHeader from './custom-header';
import CustomContent from './custom-content';
import CustomFooter from './custom-footer';

function WithSimpleLayout(WrappedComponent: React.FC): React.FC {
  function HOC() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <CustomHeader />
        <CustomContent>
          <WrappedComponent />
        </CustomContent>
        <CustomFooter />
      </Layout>
    );
  }

  return HOC;
}

export default WithSimpleLayout;
