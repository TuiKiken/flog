import React, { FC } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import { Avatar, Layout, Menu, Typography } from 'antd';
import { EditOutlined, GlobalOutlined, AreaChartOutlined, HeartOutlined } from '@ant-design/icons';

import './App.css';

import 'services/firebase';
import Auth from 'components/Auth';
import AddFlog from 'pages/AddFlog';
import { useSelector } from 'hooks/useSelector';
import user from 'store/user';

const App: FC = () => {
  const isAuthorized = useSelector(user.isAuthorized);
  const displayName = useSelector(user.getDisplayName);
  const photoURL = useSelector(user.getPhotoURL);

  return (
    <Router>
      <Layout>
        <Layout.Header>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<EditOutlined />}><Link to="/add">Добавить</Link></Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined />}><Link to="/view">Просмотреть на карте</Link></Menu.Item>
            <Menu.Item key="3" icon={<AreaChartOutlined />}><Link to="/analytics">Аналитика</Link></Menu.Item>
            {isAuthorized && (
              <Menu.Item key="4" icon={<Avatar src={photoURL} />} disabled style={{ marginLeft: 'auto' }}>{displayName}</Menu.Item>
            )}
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
            <Redirect from="/" to="/add" />
          </Switch>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          <Typography.Text type="secondary">With <HeartOutlined /> from Belarus</Typography.Text>
        </Layout.Footer>
      </Layout>
      <Auth />
    </Router>
  );
}

export default App;
