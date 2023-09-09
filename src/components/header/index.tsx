import React, { ReactNode } from 'react'
import { Layout, theme } from 'antd'
import './index.less'

const { Header: AntdHeader } = Layout
interface HeaderProps {
  children: ReactNode;
}
function Header(props: HeaderProps) {
  const { token: { colorBgContainer } } = theme.useToken();
  return (
    <AntdHeader className="flex items-center pl-10 header h-50" style={{ background: colorBgContainer }}>
      {props.children}
    </AntdHeader>
  )
}

export default React.memo(Header)