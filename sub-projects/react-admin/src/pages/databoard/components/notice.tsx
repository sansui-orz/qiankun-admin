import React from "react";
import { Card, message } from "antd";
import { PanelData } from "@/types/api";
import Loading from "@/comonents/loading";

function Notice(props: { notice: PanelData['notice'] }) {
  const [messageApi, contextHolder] = message.useMessage();
  const onClick = () => {
    messageApi.open({
      type: "error",
      content: "不支持深度拓展功能！",
    });
  };
  return (
    <Card title={`通知公告(${props.notice?.length})`} extra={<a href="#" onClick={onClick}>更多</a>}>
      {contextHolder}
      <ul>
        {props.notice ? props.notice!.map((item) => {
          return (
            <li className="flex cursor-pointer hover:underline" key={item.id}>
              <p className="overflow-hidden grow whitespace-nowrap text-ellipsis">{item.desc}</p>
              <span className="shrink-0">{item.publicTime}</span>
            </li>
          );
        }) : <Loading />}
      </ul>
    </Card>
  );
}

export default React.memo(Notice);
