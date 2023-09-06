import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, } from "react-router-dom";
import router from './router/router.tsx';
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';

let ReactRoot: ReactDOM.Root | undefined = undefined;

function render(props: { container?: HTMLElement }) {
  console.log('props =>', props)
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  ReactRoot = ReactDOM.createRoot(root as HTMLElement)
  ReactRoot.render(<App>
    <RouterProvider router={router} />
  </App>,)
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
      if (ReactRoot) {
        ReactRoot.unmount()
        ReactRoot = undefined
      }
    }
  })
}

// export async function bootstrap() {
//   console.log('[react16] react app bootstraped');
// }

// export async function mount(props: { container?: HTMLElement }) {
//   console.log('[react16] props from main framework', props);
//   render(props);
// }

// export async function unmount() {
//   // const { container } = props;
//   if (ReactRoot) {
//     ReactRoot.unmount()
//     ReactRoot = undefined
//   }
//   // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
//   ReactDOM
// }

