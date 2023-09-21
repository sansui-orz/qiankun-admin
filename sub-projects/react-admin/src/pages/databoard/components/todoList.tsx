import React from "react";
import { Card, message } from "antd";
import { PanelData } from '@/types/api'
import Loading from "@/comonents/loading";

function TodoList(props: { list: PanelData['todoList'] }) {
  const [messageApi, contextHolder] = message.useMessage();
  const onClick = () => {
    messageApi.open({
      type: "error",
      content: "不支持深度拓展功能！",
    });
  };
  return (
    <Card title={`${$t('todolist')}(${props.list?.length})`} extra={<a href="#" onClick={onClick}>{$t('more')}</a>}>
      {contextHolder}
      <ul>
        {props.list ? props.list!.map((item) => {
          return (
            <li className="flex" key={item.id}>
              <p className="mr-10 overflow-hidden grow whitespace-nowrap text-ellipsis">{item.desc}</p>
              <div className="shrink-0 a" onClick={onClick}>
                {item.todo.text}
              </div>
            </li>
          );
        }) : <Loading />}
      </ul>
    </Card>
  );
}

export default React.memo(TodoList);
