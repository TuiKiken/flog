import React, { FC } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import './App.css';

import 'services/firebase';
import Auth from 'components/Auth';
import Menu from 'components/Menu';
import AddFlog from 'pages/AddFlog';
import ViewFlog from 'pages/ViewFlog';
import ExploreFlog from 'pages/ExploreFlog';
import Analytics from 'pages/Analytics';

const App: FC = () => (
  <BrowserRouter>
    <Layout>
      <Layout.Header>
        <Menu />
      </Layout.Header>
      <Layout.Content className="app-content">
        <Switch>
          <Route path="/add">
            <AddFlog />
          </Route>
          <Route path="/explore/:id">
            <ViewFlog />
          </Route>
          <Route path="/explore">
            <ExploreFlog />
          </Route>
          <Route path="/analytics">
            <Analytics />
          </Route>
          <Redirect from="/" to="/add" />
        </Switch>
      </Layout.Content>
      <Layout.Footer className="app-footer">
        <Typography.Text type="secondary">With <HeartOutlined /> from Belarus</Typography.Text>
      </Layout.Footer>
    </Layout>
    <Auth />
  </BrowserRouter>
);

export default App;
