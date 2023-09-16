import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading = (props: { className?: string; style?: any }) => (
  <div className={'loading w-full p-30 flex items-center justify-center' + (props.className || '')} style={props.style}>
    <Spin indicator={antIcon} />
  </div>
);

export function loadingHoc(component: JSX.Element, isLoading: boolean, style: any) {
  if (isLoading) {
    return <Loading style={style}></Loading>
  } else {
    return component
  }
}

export function LoadingContainer(props: { children: JSX.Element; isLoading: boolean; }) {
  return (
    <div className="loading-container relative">
      {props.isLoading ? <div className="loading absolute w-full h-full top-0 left-0">
        <Spin indicator={antIcon} />
      </div> : null}
      {props.children}
    </div>
  )
}

export default Loading;
