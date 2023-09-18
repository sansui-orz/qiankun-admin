import { useRef, useEffect, useState } from "react";
import "./index.less";
import { Col, Row } from "antd";
import TodoList from "./components/todoList";
import Records from "./components/record";
import Notice from "./components/notice";
import SimpleChartPanel from "./components/simpleChartPanel";
import request from "main_request_react/request";
import { PanelData } from "@/types/api";
import { loadingHoc } from "@/comonents/loading";

export default function Databoard() {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PanelData>({});
  useEffect(() => {
    async function getData() {
      const res = await request.get<PanelData>("/panel");
      setData(res.data);
    }
    getData();
  }, []);
  return (
    <div className="p-10 databoard" ref={ref}>
      <Row gutter={20}>
        <Col span={8}>
          <TodoList list={data.todoList} />
        </Col>
        <Col span={8}>
          <Records records={data.records} />
        </Col>
        <Col span={8}>
          <Notice notice={data.notice} />
        </Col>
      </Row>
      <Row>
        {loadingHoc(
          data.sale ? (
            <SimpleChartPanel
              sale={data.sale}
              coversionRate={data.conversionRate}
              origin={data.origin}
              uv={data.uv}
              store={data.store}
            />
          ) : <></>,
          !data.sale,
          { marginTop: '200px' }
        )}
      </Row>
    </div>
  );
}
