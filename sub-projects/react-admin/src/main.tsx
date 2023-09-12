import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, } from "react-router-dom";
import router from './router/router.tsx';
import qiankunInit from './qiankun'

type RenderProps =  {
    container?: HTMLElement;
    setGlobalState?: (arg: {type: string; value: any}) => void
  }

function render(props: RenderProps): [Element, ReturnType<typeof ReactDOM.createRoot>] {
  const { container } = props;
  const root = container ? container.querySelector('#root') : document.querySelector('#root')
  const ReactRoot = ReactDOM.createRoot(root as HTMLElement)
  ReactRoot.render(<App setGlobalState={props.setGlobalState}>
    <RouterProvider router={router} />
  </App>,)
  return [root!, ReactRoot]
}

export type RenderType = typeof render

qiankunInit(render)