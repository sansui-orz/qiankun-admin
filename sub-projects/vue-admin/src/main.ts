import { createApp, App as TypeApp } from 'vue'
import "normalize.css";
import App from './App.vue'
import Router from '@/router/router'
import qiankunInit from './qiankun'
import { createPinia } from 'pinia'
import { i18nInit } from 'main_for_vue/i18n'
import languageEn from '@/utils/language-en.json'
import languageZh from '@/utils/language-zh.json'

declare global {
  const $t: (code: string, options?: any) => string;
}
declare module 'vue' {
  // 扩展全局变量的接口内容，需要扩展ComponentCustomProperties这个接口
  interface ComponentCustomProperties {
  	$t: (code: string, options?: any) => string;
  }
}

const i18n = i18nInit({
  'en': languageEn,
  'zh-CN': languageZh
})

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
  // 多语言转换方法
  app.config.globalProperties.$t = i18n.t.bind(i18n)
  app.use(Router).use(createPinia()).mount(root!)
  return [root!, app]
}
export type RenderType = typeof render

qiankunInit(render)