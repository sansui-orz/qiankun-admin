import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from '@/router/router'
import qiankunInit from './qiankun'

function render(props: { container?: HTMLElement, setGlobalState?: (args: { type: string; value: any }) => void }) {
  const { container } = props;
  const root = container ? container.querySelector('#vue-app') : document.querySelector('#vue-app')
  const app = createApp(App)
  if (props.setGlobalState) {
    app.provide('setGlobalState', props.setGlobalState)
  }
  app.use(Router).mount(root!)
  return app
}
export type RenderType = typeof render

qiankunInit(render)