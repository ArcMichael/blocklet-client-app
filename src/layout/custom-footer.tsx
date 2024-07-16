import { Layout } from 'antd';

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer style={{ textAlign: 'left', padding: '24px 50px' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
}

export default CustomFooter;
