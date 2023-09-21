import React, { useCallback } from "react";
import { Button, Form, Input, message } from "antd";
import { axios, encodePassword } from "@/utils";
import { useSearchParams } from 'react-router-dom'
import Cookie from 'js-cookie'

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};

export type SignupSubmitType = (
  success: boolean,
  values: FieldType,
  errorInfo?: any
) => void;

export default function Signup(props: { onSubmit: SignupSubmitType }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams] = useSearchParams();

  const onFinish = useCallback(
    async (values: FieldType) => {
      try {
        props.onSubmit(true, values);
        const res = await axios.post("/signup", {
          ...values,
          password: encodePassword(values.password!),
        });
        const back = searchParams.get('back')
        Cookie.set('TOKEN', res.data.token, { expires: 7, path: '' })
        window.location.href = back ? decodeURIComponent(back) : '/'
      } catch (err: unknown) {
        messageApi.open({
          type: "error",
          content: err!.toString(),
        });
      }
    },
    [props.onSubmit]
  );

  const onFinishFailed = useCallback(
    (errorInfo: any) => {
      console.log("Failed:", errorInfo);
      props.onSubmit(false, {}, errorInfo);
    },
    [props.onSubmit]
  );

  return (
    <div className="mt-40 signup">
      {contextHolder}
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
          rules={[{ required: true, message: "请输入您的用户名！" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[{ required: true, message: "请输入您的登录邮箱！" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入您的密码！" }]}
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
  );
}
