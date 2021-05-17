import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { EditOutlined, GlobalOutlined, AreaChartOutlined, HeartOutlined } from '@ant-design/icons';

import './App.css';

import AddFlog from 'pages/AddFlog';

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<EditOutlined />}><Link to="/add">Добавить</Link></Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined />}><Link to="/view">Просмотреть на карте</Link></Menu.Item>
            <Menu.Item key="3" icon={<AreaChartOutlined />}><Link to="/analytics">Аналитика</Link></Menu.Item>
          </Menu>
        </Layout.Header>
        <Layout.Content style={{ background: '#fff', padding: '20px' }}>
          <Switch>
            <Route path="/add">
              <AddFlog />
            </Route>
            <Route path="/view">
              View page
            </Route>
            <Route path="/analytics">
              Analytics page
            </Route>
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <Typography.Text type="secondary">With <HeartOutlined /> from Belarus</Typography.Text>
        </Layout.Footer>
      </Layout>
    </Router>
  );
}

export default App;
