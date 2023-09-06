import { createApp, App as TypeApp } from 'vue'
import './style.css'
import App from './App.vue'
import Router from '@/router/router'
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper'

let app: TypeApp | undefined = undefined

function render(props: { container?: HTMLElement }) {
  const { container } = props;
  const root = container ? container.querySelector('#vue-app') : document.querySelector('#vue-app')
  app = createApp(App)
  app.use(Router).mount(root!)
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
} else {
  renderWithQiankun({
    mount(props: { container?: HTMLElement }) {
      render(props);
    },
    bootstrap() {
      console.log('--bootstrap');
    },
    update() {
      console.log('--update');
    },
    unmount() {
      console.log('unmount')
      if (app) {
        app.unmount()
        app = undefined
      }
    }
  })
}