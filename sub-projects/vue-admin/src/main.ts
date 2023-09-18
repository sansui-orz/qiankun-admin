import { createApp, App as TypeApp } from 'vue'
import "normalize.css";
import App from './App.vue'
import Router from '@/router/router'
import qiankunInit from './qiankun'
import pinia from '@/store/index'

type RenderProps = {
  container?: HTMLElement;
  setGlobalState?: (args: { type: string; value: any }) => void;
}

function render(props: RenderProps): [Element, TypeApp] {
  const { container } = props;
  const root = container ? container.querySelector('#vue-app') : document.querySelector('#vue-app')
  const app = createApp(App)
  if (props.setGlobalState) {
    app.provide('setGlobalState', props.setGlobalState)
  }
  app.use(Router).use(pinia).mount(root!)
  return [root!, app]
}
export type RenderType = typeof render

qiankunInit(render)