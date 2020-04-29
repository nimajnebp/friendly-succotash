import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import React, { Suspense, lazy, useState } from 'react';
import { Switch, Route, NavLink, useLocation } from 'react-router-dom';
import './App.scss';

// Ant-design tools.
import { Layout, Menu, Skeleton } from 'antd';
import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

// Lazy comps.
const Dashboard = lazy(() => import('components/Dashboard/Dashboard'));
const Todos = lazy(() => import('components/Todos/Todos'));

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const links = [
    { name: 'Dashboard', path: '/', icon: (<AppstoreOutlined />) },
    { name: 'Todos', path: '/todos', icon: (<UnorderedListOutlined />) },
  ];

  return (
    <div className="app">
      <Layout style={{ minHeight: '100vh' }}>
        <Layout.Sider collapsible breakpoint="md" collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
          <div className="site-logo" style={{ }}>{ collapsed ? 'F.S.' : 'Friendly Succotash'}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
            { links.map((e) => (
              <Menu.Item key={e.path}>
                <NavLink to={e.path}>
                  {e.icon}
                  <span>{e.name}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Layout.Sider>
        <Layout className="site-layout">
          <Layout.Content style={{ margin: '1rem' }}>
            <div className="site-layout-background" style={{ padding: '2rem' }}>
              <Suspense fallback={<div><Skeleton active /></div>}>
                <Switch>
                  <Route exact path="/todos" component={Todos} />
                  <Route path="/" component={Dashboard} />
                </Switch>
              </Suspense>
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default connect()(hot(App));
