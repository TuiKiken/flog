import React from 'react';
import { Button, Modal } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch } from 'hooks/useDispatch';
import { useSelector } from 'hooks/useSelector';
import { AUTH_PROVIDER } from 'constants/auth';
import user, { signInRequest } from 'store/user';

const Auth = () => {
  const dispatch = useDispatch();
  const authorized = useSelector(user.isAuthorized);
  const handleGoogleAuth = () => dispatch(signInRequest({ provider: AUTH_PROVIDER.google }));

  return (
    <Modal title="Авторизация" visible={!authorized} centered closable={false} footer={null}>
      <Button type="primary" icon={<GoogleOutlined />} onClick={handleGoogleAuth}>
        Авторизоваться через Google
      </Button>
    </Modal>
  );
};

export default Auth;
