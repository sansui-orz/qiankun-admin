import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, } from "react-router-dom";
import router from './router/router.tsx';
import './global.d.ts'

function render(props: { container?: HTMLElement }) {
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  ReactDOM.createRoot(root as HTMLElement).render(<App>
    <RouterProvider router={router} />
  </App>,)
}
// declare global {
//   interface Window {
//     __POWERED_BY_QIANKUN__?: boolean;
//   }
// }
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}


