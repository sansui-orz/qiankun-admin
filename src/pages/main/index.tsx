import React from 'react'
import { Watermark } from 'antd'
import { useSelector } from 'react-redux';
import Layout from '@/components/layout';
import { RootState } from '@/store'

export default function Main() {
  const { username } = useSelector<RootState, RootState['userState']>(state => state.userState)
  return (
    <Layout>
      <Watermark className="w-full h-full" content={username}>
        <div id="root"></div>
      </Watermark>
    </Layout>
  )
}
