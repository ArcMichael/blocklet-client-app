import { Layout, theme } from 'antd';
import { ReactNode } from 'react';
// import Breadcrumbs from '../Components/Breadcrumbs';

const { Content } = Layout;

interface CustomContentProps {
  children: ReactNode;
}

function CustomContent(props: CustomContentProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}>
      {/* {showBreadcrumbs && <Breadcrumbs />} */}
      {props.children}
    </Content>
  );
}

export default CustomContent;
