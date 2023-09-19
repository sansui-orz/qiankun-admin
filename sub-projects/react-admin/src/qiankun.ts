import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import { RenderType } from './main'
import store from '@/store'

export default function qiankunInit(render: RenderType) {
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
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
