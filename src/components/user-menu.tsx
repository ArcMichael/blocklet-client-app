import { Dropdown, Avatar, MenuProps, message } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useUser } from '../contexts/user-context';

function UserMenu() {
  const { nickname } = useUser();
  const handleLogout = () => {
    // eslint-disable-next-line no-console
    console.log('Logged out');
    message.info('Logged out.');
  };

  const Navigate = () => {
    message.info('Navigate to Profile Page.');
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: Navigate,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['hover']}>
      <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Avatar icon={<UserOutlined />} />
        <span
          style={{
            marginLeft: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '200px',
          }}>
          {nickname}
        </span>
      </div>
    </Dropdown>
  );
}

export default UserMenu;
