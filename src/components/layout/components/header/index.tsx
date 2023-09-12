import React, { ReactNode } from 'react'
import { Layout, theme } from 'antd'
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'
import './index.less'

const { Header: AntdHeader } = Layout
interface HeaderProps {
  children: ReactNode;
}
function Header(props: HeaderProps) {
  const { token: { colorBgContainer } } = theme.useToken();
  const { avatar } = useSelector<RootState, RootState['userState']>(state => state.userState)
  return (
    <AntdHeader className="flex items-center pl-10 header h-50" style={{ background: colorBgContainer }}>
      {props.children}
      {/* <div className="flex">
        <Image src={avatar} />
      </div> */}
    </AntdHeader>
  )
}

export default React.memo(Header)