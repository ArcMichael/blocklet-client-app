// src/Layout/CustomHeader.tsx

import { Layout } from 'antd';
import UserMenu from '../components/user-menu';

const { Header } = Layout;

interface CustomHeaderProps {
  showUserMenu?: boolean;
}

function CustomHeader(props: CustomHeaderProps) {
  return (
    <Header
      style={{
        padding: 0,
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <div style={{ flex: 1 }} />
      {props.showUserMenu && (
        <div style={{ marginRight: '16px' }}>
          <UserMenu />
        </div>
      )}
    </Header>
  );
}

CustomHeader.defaultProps = {
  showUserMenu: true,
};

export default CustomHeader;
