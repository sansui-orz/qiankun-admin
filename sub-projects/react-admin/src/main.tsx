import ReactDOM from 'react-dom/client'
import "normalize.css";
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routerList from './router/router.tsx';
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
import { i18nInit } from 'main_for_react/i18n'
import languageEn from '@/utils/language-en.json'
import languageZh from '@/utils/language-zh.json'
import SingleControl from "@/comonents/singleControl";
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

declare global {
  const $t: (code: string, options?: any) => string;
  const qiankunMainAppHost: string;
}

i18nInit({
  'en': languageEn,
  'zh-CN': languageZh
})


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
    <BrowserRouter basename={qiankunWindow.__POWERED_BY_QIANKUN__ ? '/databoard' : '/'}>
      <Routes>
        {routerList.map(item => <Route key={item.path} path={item.path} element={item.element}></Route>)}
        <Route path="*" element={routerList[0].errorElement} />
      </Routes>
      {!qiankunWindow.__POWERED_BY_QIANKUN__ && <SingleControl />}  
    </BrowserRouter>
  </App>,)
  return [root!, ReactRoot]
}

export type RenderType = typeof render

qiankunInit(render)