import { createApp, App as TypeApp } from 'vue'
import "normalize.css";
import App from './App.vue'
import Router from '@/router/router'
import qiankunInit from './qiankun'
import { createPinia } from 'pinia'

export type RenderProps = {
  container?: HTMLElement;
  dispatch?: (arg: { type: string; value: any }) => void;
  getMainState?: () => any;
}

function render(props: RenderProps): [Element, TypeApp] {
  const { container } = props;
  const root = container ? container.querySelector('#vue-app') : document.querySelector('#vue-app')
  const app = createApp(App)
  if (props.dispatch) {
    app.provide('dispatch', props.dispatch)
    app.provide('getMainState', props.getMainState)
  }
  app.use(Router).use(createPinia()).mount(root!)
  return [root!, app]
}
export type RenderType = typeof render

qiankunInit(render)