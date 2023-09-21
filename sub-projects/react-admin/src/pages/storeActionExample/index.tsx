import { useCallback, useEffect } from 'react'
import { Form, Input, Button, Card, Row, Col } from 'antd'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useMainStoreDispatch } from '@/hooks';

function StoreActionExample() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const user = useSelector<RootState, RootState['userState']>(state => state.userState)
  const config = useSelector<RootState, RootState['configState']>(state => state.configState)
  const dispatch = useMainStoreDispatch()
  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(form.getFieldsValue())) {
      form.setFieldsValue({ ...user })
    }
  }, [user])
  useEffect(() => {
    if (JSON.stringify(config) !== JSON.stringify(form2.getFieldsValue())) {
      form2.setFieldsValue({ ...config })
    }
  }, [config])
  const onFinish = useCallback(
    (fieldsValue: RootState['userState']) => {
      if (JSON.stringify(fieldsValue) !== JSON.stringify(user)) {
        dispatch({ type: 'setUserInfo', value: fieldsValue })
      } else {
        console.log('数据没有变化')
      }
    },
    [user]
  );
  const onFinish2 = useCallback(
    (fieldsValue: RootState['userState']) => {
      console.log('fieldsValue', fieldsValue)
      if (JSON.stringify(fieldsValue) !== JSON.stringify(config)) {
        dispatch({ type: 'setConfig', value: fieldsValue })
      } else {
        console.log('数据没有变化')
      }
    },
    [config]
  );
  return (
    <div className="store-action-example">
      <Row gutter={20}>
        <Col span={12}>
          <Card title="更新全局用户信息">
            <Form
              form={form}
              labelCol={{ span: 6 }}
              onFinish={onFinish}
              initialValues={{
                ...user
              }}
            >
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: "请输入用户名" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="account"
                label="邮箱"
                rules={[{ required: true, message: "请输入邮箱" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="avatar"
                label="头像"
                rules={[{ required: true, message: "请输入头像url" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="language"
                label="语言"
              >
                <Input disabled />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  更新
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="更新全局系统信息">
            <Form
              form={form2}
              labelCol={{ span: 6 }}
              onFinish={onFinish2}
              initialValues={{
                ...config
              }}
            >
              <Form.Item
                name="name"
                label="系统名称"
                rules={[{ required: true, message: "请输入系统名称" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="version"
                label="系统版本"
                rules={[{ required: true, message: "请输入系统版本" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 6 }}>
                <Button type="primary" htmlType="submit">
                  更新
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default StoreActionExample