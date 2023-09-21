import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { RenderType } from './main'
import { useUserStore } from '@/store/user'
import { useConfigStore } from '@/store/config'

function qiankunInit(render: RenderType) {
  let root: Element | undefined
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({});
  } else {
    renderWithQiankun({
      mount(props: QiankunProps) {
        if (!root) {
          const { dispatch, getMainState } = props.store.connectVueStore('vue-sub-project', {
            // 需要关联的Store放在这里
            'userState': useUserStore,
            'configState': useConfigStore
          });
          [root] = render({ ...props, dispatch, getMainState });
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
