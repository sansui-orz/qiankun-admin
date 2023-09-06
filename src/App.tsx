import React from 'react'
import { ConfigProvider } from 'antd';
import Layout from '@/components/layout';
import { RouterProvider } from 'react-router-dom';
import './App.less'
import router from './router/router';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App