import { Button, Checkbox, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router';
import { authStorageKeys } from '../../constants';
import { login } from '../../features/AuthFeature/AuthSlice';

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const onFinish = async (values) => {
    try {
      const data = await dispatch(login(values)).unwrap();
      history.push('/');
      message.success('Đăng nhập thành công');
    } catch (error) {
      message.error('Đăng nhập không thành công');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (Boolean(localStorage.getItem(authStorageKeys.TOKEN))) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Nhớ mật khẩu</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
