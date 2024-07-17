import { Layout } from 'antd';
import UserMenu from '../components/user-menu';

const { Header } = Layout;

interface CustomHeaderProps {
  showUserMenu: boolean;
}

function CustomHeader({ showUserMenu = true }: CustomHeaderProps) {
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
      {showUserMenu && (
        <div style={{ marginRight: '16px' }}>
          <UserMenu />
        </div>
      )}
    </Header>
  );
}

export default CustomHeader;
