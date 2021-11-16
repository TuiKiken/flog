import React, { FC, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Menu as AntMenu } from 'antd';
import { AreaChartOutlined, EditOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons';

import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';
import user, { signOutRequest } from 'store/user';

const Menu: FC = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(user.isAuthorized);
  const displayName = useSelector(user.getDisplayName);
  const photoURL = useSelector(user.getPhotoURL);
  const location = useLocation();
  const handleSignOut = useCallback(() => dispatch(signOutRequest()), [dispatch]);

  return (
    <AntMenu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
      <AntMenu.Item key="/add" icon={<EditOutlined />}><Link to="/add">Добавить</Link></AntMenu.Item>
      <AntMenu.Item key="/explore" icon={<GlobalOutlined />}><Link to="/explore">Просмотреть на карте</Link></AntMenu.Item>
      <AntMenu.Item key="/analytics" icon={<AreaChartOutlined />}><Link to="/analytics">Аналитика</Link></AntMenu.Item>
      {isAuthorized && (
        <AntMenu.SubMenu key="user" icon={<Avatar src={photoURL} />} title={displayName} style={{ marginLeft: 'auto' }}>
          <AntMenu.Item key="logout" icon={<LogoutOutlined />} onClick={handleSignOut}>Выйти</AntMenu.Item>
        </AntMenu.SubMenu>
      )}
    </AntMenu>
  );
};

export default Menu;
