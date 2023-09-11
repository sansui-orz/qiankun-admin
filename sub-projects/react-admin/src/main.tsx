import { qiankunWindow, renderWithQiankun, QiankunProps } from 'vite-plugin-qiankun/dist/helper';

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  import('./bootstrap').then(({ default: render }) => {
    render({})
  })
} else {
  console.log('run in main')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ReactRoot: any;
  renderWithQiankun({
    mount(props: QiankunProps) {
      import('./bootstrap').then(({ default: render }) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ReactRoot = render({ ...props, setGlobalState: (arg: { type: string; value: any }) => {
          console.log('setGlobalState 111', props.actions.dispatch)
          props.actions.dispatch(arg)
        } })
      })
    },
    bootstrap() {
      console.log('--bootstrap');
    },
    update() {
      console.log('--update');
    },
    unmount() {
      if (ReactRoot) {
        ReactRoot.unmount()
        ReactRoot = undefined
      }
    }
  })
}
