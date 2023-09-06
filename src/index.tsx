import React from 'react'
import ReactDOM from 'react-dom/client'
import { registerMicroApps, start } from 'qiankun';
import 'normalize.css'
import App from './App'


ReactDOM.createRoot(document.querySelector('#app') as HTMLElement)
  .render(<App></App>)

registerMicroApps([
  {
    name: 'react-app', // app name registered
    entry: '//localhost:8001',
    container: '#root',
    activeRule: (location) => {
      return location.pathname.startsWith('/databoard')
    },
  },
  {
    name: 'vue-app', // app name registered
    entry: '//localhost:8002',
    container: '#root',
    activeRule: (location) => {
      return location.pathname.startsWith('/system')
    },
  },
]);

start();

export default {};