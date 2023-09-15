import { useLifeEventLog } from "@/hooks";
import {
  Card,
  Form,
  DatePicker,
  Button,
  Checkbox,
  Switch,
  Row,
  Col,
} from "antd";

import "./index.less";

const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;

const config = {
  rules: [
    { type: "object" as const, required: true, message: "Please select time!" },
  ],
};
const plainOptions = [
  { value: "sale", label: "销售额" },
  { value: "profit", label: "净利润" },
  { value: "order", label: "订单数" },
  { value: "uv", label: "流量" },
  { value: "conversionRate", label: "转化率" },
  { value: "return", label: "退货率" },
];

const onFinish = (fieldsValue: any) => {
  console.log("fieldsValue", fieldsValue);
};
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
function DataboardDetail() {
  useLifeEventLog("databoard-detail");
  return (
    <div className="databoard-detail">
      <Card>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item name="check-chart" label="图表选择" rules={[{ required: true, message: '请选择一个图表' }]}>
            <CheckboxGroup options={plainOptions} />
          </Form.Item>
          <Form.Item name="date-range" label="日期范围" {...config}>
            <RangePicker />
          </Form.Item>
          <Row>
            <Col span="20">
              <Form.Item
                name="merge-chart"
                label="&nbsp;&nbsp;&nbsp;合并图表"
                valuePropName="checked"
              >
                <Switch defaultChecked />
              </Form.Item>
            </Col>
            <Col span="4">
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  确定
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default DataboardDetail;
