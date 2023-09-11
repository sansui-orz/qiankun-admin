import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, } from "react-router-dom";
import router from './router/router.tsx';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function render(props: { container?: HTMLElement, setGlobalState?: (arg: {type: string; value: any}) => void }) {
  console.log('props =>', props)
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  const ReactRoot = ReactDOM.createRoot(root as HTMLElement)
  ReactRoot.render(<App setGlobalState={props.setGlobalState}>
    <RouterProvider router={router} />
  </App>,)
  return ReactRoot
}
