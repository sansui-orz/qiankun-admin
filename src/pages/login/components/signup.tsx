import React, { useCallback } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
  
type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};

export type SignupSubmitType = (success: boolean, values: FieldType, errorInfo?: any) => void;

export default function Signup(props: { onSubmit: SignupSubmitType }) {
  const onFinish = useCallback((values: FieldType) => {
    console.log('Success:', values);
    props.onSubmit(true, values)
  }, [props.onSubmit]);
  
  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log('Failed:', errorInfo);
    props.onSubmit(false, {}, errorInfo)
  }, [props.onSubmit]);

  return <div className="mt-40 login">
     <Form
      name="signup"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入您的用户名！' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="邮箱"
        name="email"
        rules={[{ required: true, message: '请输入您的登录邮箱！' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入您的密码！' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  </div>
}