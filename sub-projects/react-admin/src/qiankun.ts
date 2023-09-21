import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import { RenderType } from './main'
import store from '@/store'
import Cookie from 'js-cookie'

export default function qiankunInit(render: RenderType) {
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    // 如果是单独打开，则token从URL上带过来。
    if (location.search.includes('token')) {
      const token = location.search.split('token=')[1]
      Cookie.set('TOKEN', token, { expires: 7, path: '' })
    }
    render({})
  } else {
    let container: Element | undefined;
    renderWithQiankun({
      mount(props: QiankunProps) {
        const { dispatch, getMainState } = props.store.connectReactStore('react-sub-project', store);
        if (!container) {
          [container] = render({
            ...props,
            dispatch,
            getMainState
          })
        } else {
          container!.setAttribute('display', 'block')
          props.container?.parentNode?.appendChild(container)
        }
      },
      bootstrap() {
        // console.log('--bootstrap');
      },
      update() {
        console.log('--update');
      },
      unmount() {
        container!.setAttribute('display', 'none')
        document.body.appendChild<Element>(container!)
      }
    })
  }
}
