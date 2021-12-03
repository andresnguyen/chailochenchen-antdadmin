import { UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Layout, Menu, Popover } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { navlinks } from '../../constants';
import { logout } from '../../features/AuthFeature/AuthSlice';
import ProductFeature from '../../features/ProductFeature/ProductFeature';
import './Layout.scss';


const { Header, Sider, Content } = Layout;

function MainLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const currentUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch()
  const history = useHistory()

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLogoutClick = () => {
    dispatch(logout())
    history.push("/auth/login")
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className="logo">{collapsed ? 'AD' : 'ADMIN'}</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {navlinks.map((navlink, index) => (
            <Menu.Item key={index + 1} icon={navlink.icon}>
              {navlink.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: '0px 16px', display: 'flex', alignItems: 'center' }}
        >
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Trang chủ</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
          </Breadcrumb>

          <Popover placement="bottomRight" content={<Button onClick={handleLogoutClick}>Đăng xuất</Button>} trigger="click" className="user-header">
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            <span>{currentUser.name}</span>
          </Popover>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Redirect from="/home" to="/" exact />
            <Redirect from="/" to="/products" exact />

            <Route path="/products" component={ProductFeature} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
