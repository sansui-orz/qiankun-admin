import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper'
import { RenderType } from './main'
import { useUserStore } from '@/store/user'
import { useConfigStore } from '@/store/config'
import Cookie from 'js-cookie'

function qiankunInit(render: RenderType) {
  let root: Element | undefined
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    // 如果是单独打开，则token从URL上带过来。
    if (location.search.includes('token')) {
      const token = location.search.split('token=')[1]
      Cookie.set('TOKEN', token, { expires: 7, path: '' })
    }
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
