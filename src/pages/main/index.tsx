import React, { useEffect } from 'react'
import { Watermark, Spin } from 'antd'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout';
import { RootState } from '@/store'
import './index.less'

export default function Main() {
  const { username } = useSelector<RootState, RootState['userState']>(state => state.userState)
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/databoard')
    }
  }, [])
  return (
    <Layout>
      <Watermark className="relative w-full h-full" content={username}>
        <div id="main-loading" className="absolute top-0 left-0 items-center justify-center w-full h-full bg-white" style={{ display: 'none' }}>
          <Spin size="large" />
        </div>
        <div id="root"></div>
      </Watermark>
    </Layout>
  )
}
