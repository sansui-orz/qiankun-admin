import { memo, useCallback, useState, forwardRef, useImperativeHandle } from "react";
import {
  Card,
  Form,
  DatePicker,
  Button,
  Checkbox,
  Switch,
  Row,
  Col
} from "antd";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  { value: "sale", label: "销售额" },
  { value: "profit", label: "净利润" },
  { value: "order", label: "订单数" },
  { value: "uv", label: "流量" },
  { value: "conversionRate", label: "转化率" },
  { value: "return", label: "退货率" },
];

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export type SearchValues = {
  charts: string[];
  merge: boolean;
  dateRange: string[];
};

export interface IRefProps {
  search: () => void;
}

const Search = forwardRef<IRefProps, { onSearch: (values: SearchValues) => void }>(function(props, ref) {
  const [form] = Form.useForm();
  const [dates, setDates] = useState<RangeValue>(null);
  const [value, setValue] = useState<RangeValue>([
    dayjs(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    dayjs(),
  ]);
  const [rangeStatus, setRangeStatus] = useState<"" | "error">("");

  const disabledDate = useCallback(
    (current: Dayjs) => {
      if (current && current > dayjs().endOf("day")) {
        return true;
      } else {
        if (!dates) {
          return false;
        }
        const date0 = dates![0] as Dayjs;
        const date1 = dates![1] as Dayjs;
        // 最多选择30天的记录
        const tooLate = date0 && current.diff(date0, "days") >= 30;
        const tooEarly = date1 && date1.diff(current, "days") >= 30;
        return !!tooEarly || !!tooLate;
      }
    },
    [dates]
  );
  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        setDates([null, null]);
      } else {
        setDates(null);
      }
    },
    [setDates]
  );

  const onFinish = useCallback(
    (fieldsValue: { charts: string[]; merge: boolean }) => {
      if (!value) {
        setRangeStatus("error");
        return;
      }
      const date0 = value![0] as Dayjs;
      const date1 = value![1] as Dayjs;
      const diffDays = date1.diff(date0, "days")
      
      props.onSearch && props.onSearch({
        ...fieldsValue,
        dateRange: Array.from({ length: diffDays }).fill('').map((_, index) => date0.add(index, 'day').format('YYYY-MM-DD')),
      })
    },
    [value]
  );
  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      search() {
        form.submit()
      }
    }
  })

  return (
    <Card>
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          charts: plainOptions.map((item) => item.value),
          merge: true,
        }}
      >
        <Form.Item
          name="charts"
          label="图表选择"
          rules={[{ required: true, message: "请选择一个图表" }]}
        >
          <CheckboxGroup options={plainOptions} />
        </Form.Item>
        <Form.Item
          label="日期范围"
          required={true}
          validateStatus={rangeStatus}
          help={rangeStatus === "error" ? "请选择日期范围" : undefined}
        >
          <RangePicker
            value={dates || value}
            onCalendarChange={(val) => {
              setDates(val);
            }}
            onChange={(val) => {
              if (!val) {
                setRangeStatus("error");
              } else if (rangeStatus) {
                setRangeStatus("");
              }
              setValue(val);
            }}
            onOpenChange={onOpenChange}
            disabledDate={disabledDate}
            changeOnBlur
          />
        </Form.Item>
        <Row>
          <Col span="20">
            <Form.Item
              hidden={true}
              name="merge"
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
                更新
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
})

export default memo(Search);
