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
    <AntdHeader className="header h-50 pl-10 flex items-center" style={{ background: colorBgContainer }}>
      {props.children}
    </AntdHeader>
  )
}

export default React.memo(Header)