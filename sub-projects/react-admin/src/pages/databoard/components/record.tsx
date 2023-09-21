import React from "react";
import { Card, message } from "antd";
import { PanelData } from '@/types/api'
import Loading from "@/comonents/loading";

function Records(props: { records: PanelData['records'] }) {
  const [messageApi, contextHolder] = message.useMessage();
  const onClick = () => {
    messageApi.open({
      type: "error",
      content: "不支持深度拓展功能！",
    });
  };
  return (
    <Card title={`${$t('change-logs')}(${props.records?.length})`} extra={<a href="#" onClick={onClick}>{$t('more')}</a>}>
      {contextHolder}
      <ul>
        {props.records ? props.records!.map((item) => {
          return (
            <li className="flex" key={item.id}>
              <p className="overflow-hidden grow whitespace-nowrap text-ellipsis">{item.desc}</p>
            </li>
          );
        }) : <Loading />}
      </ul>
    </Card>
  );
}

export default React.memo(Records);
