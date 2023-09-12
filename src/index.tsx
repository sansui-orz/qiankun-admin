import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import App from './App'
import qiankunInit from './qiankun'
import request from './utils/request'
import store from '@/store'
import { ConfigResponse } from './types/api'

function init() {
  ReactDOM.createRoot(document.querySelector('#app') as HTMLElement)
    .render(<App></App>)
    qiankunInit()
  }
  
  if (location.pathname !== '/login') {
    request.get<ConfigResponse>('/config').then((res) => {
    store.dispatch({ type: 'setUserInfo', value: res.data.userInfo })
    store.dispatch({ type: 'setMenus', value: res.data.rules.menus })
    init()
  }).catch(err => {})
} else {
  init()
}

export default {};