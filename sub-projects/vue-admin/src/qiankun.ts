import { App as TypeApp } from 'vue'
import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { RenderType } from './main'

function qiankunInit(render: RenderType) {
  let app: TypeApp | undefined
  let root: Element | undefined
  // let skipStateChange = false
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
  } else {
    renderWithQiankun({
      mount(props: QiankunProps) {
        if (!root) {
          [root, app] = render({ ...props, setGlobalState: ({ type, value }) => {
            switch(type) {
              case 'addTabs':
                props.actions.dispatch({ type, value: '/system/' + value })
                return
            }
          } });
        } else {
          root!.setAttribute('display', 'block')
          props.container?.parentNode?.appendChild(root!)
        }
      },
      bootstrap() {
        console.log('--bootstrap');
      },
      update() {
        console.log('--update');
      },
      unmount() {
        root!.setAttribute('display', 'none')
        document.body.appendChild<Element>(root!)
      }
    })
  }
}

export default qiankunInit
