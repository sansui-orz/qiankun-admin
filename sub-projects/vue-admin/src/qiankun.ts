import { App as TypeApp } from 'vue'
import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { RenderType } from './main'

function qiankunInit(render: RenderType) {
  let app: TypeApp | undefined = undefined
  let skipStateChange = false
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
  } else {
    renderWithQiankun({
      mount(props: QiankunProps) {
        app = render({ ...props, setGlobalState: ({ type, value }) => {
          switch(type) {
            case 'addTabs':
              props.actions.dispatch({ type, value: '/system/' + value })
              return
          }
        } });
        props.onGlobalStateChange((state: any, prev: any) => {
          if (skipStateChange) {
            console.log('当前子应用跳过的')
          } else {
            console.log('state ', state, prev)
          }
        })
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
}

export default qiankunInit
