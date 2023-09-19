import ReactDOM from 'react-dom/client'
import "normalize.css";
import App from './App.tsx'
import { RouterProvider, } from "react-router-dom";
import router from './router/router.tsx';
import qiankunInit from './qiankun'

import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { ToolboxComponent } from 'echarts/components';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
  PieChart,
  ToolboxComponent
]);

export type RenderProps =  {
  container?: HTMLElement;
  dispatch?: (arg: {type: string; value: any}) => void;
  getMainState?: () => any;
}

function render(props: RenderProps): [Element, ReturnType<typeof ReactDOM.createRoot>] {
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  const ReactRoot = ReactDOM.createRoot(root as HTMLElement)
  ReactRoot.render(<App dispatch={props.dispatch} getMainState={props.getMainState}>
    <RouterProvider router={router} />
  </App>,)
  return [root!, ReactRoot]
}

export type RenderType = typeof render

qiankunInit(render)