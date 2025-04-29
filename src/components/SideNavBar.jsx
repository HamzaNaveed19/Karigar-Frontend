import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DashboardOutlined,
  UploadOutlined,
  MessageOutlined,
  BellOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import './../styling/SideNavBar.css';

const { Sider, Content } = Layout;

const SideNavBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} className="sider">
        <div className="logo">SP Dashboard</div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} className="menu">
          <Menu.Item key="1" icon={<UserOutlined />} className="menu-item">Profile</Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />} className="menu-item">Documents & Portfolio</Menu.Item>
          <Menu.Item key="3" icon={<CalendarOutlined />} className="menu-item">Booking Management</Menu.Item>
          <Menu.Item key="4" icon={<DashboardOutlined />} className="menu-item">Analytics Dashboard</Menu.Item>
          <Menu.Item key="5" icon={<MoneyCollectOutlined />} className="menu-item">Earnings Dashboard</Menu.Item>
          <Menu.Item key="6" icon={<MessageOutlined />} className="menu-item">Customer Reviews</Menu.Item>
          <Menu.Item key="7" icon={<BellOutlined />} className="menu-item">Notifications</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="content-layout">
        <Content className="content">
          <h1>Welcome to Service Provider Dashboard</h1>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideNavBar;
