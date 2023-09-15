import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper';
import { RenderType } from './main'
export default function qiankunInit(render: RenderType) {
  if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
    render({})
  } else {
    let container: Element | undefined;
    renderWithQiankun({
      mount(props: QiankunProps) {
        if (!container) {
          [container] = render({
            ...props,
            setGlobalState: (arg: { type: string; value: any }) => {
              props.actions.dispatch(arg)
            }
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
