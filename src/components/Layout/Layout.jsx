import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { navlinks } from '../../constants';
import ProductFeature from '../../features/ProductFeature/ProductFeature';
import './Layout.scss';

const { Header, Sider, Content } = Layout;

function MainLayout(props) {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {navlinks.map((navlink, index) => (
            <Menu.Item key={index + 1} icon={navlink.icon}>
              {navlink.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, paddingLeft: 16 }}>
          Home > Quản lý sản phẩm
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

            <Route path="/products" component={ProductFeature} exact />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

MainLayout.propTypes = {};

export default MainLayout;
