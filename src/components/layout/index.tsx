import React, { useState, ReactNode, useCallback } from 'react'
import { Layout as AntdLayout, Button, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import Header from './components/header'
import Menu from './components/menu'
import Tabs from './components/tabs'


function Layout(props: { children: ReactNode, clickHandle?: (path: string) => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer } } = theme.useToken();
  const navigate = useNavigate()

  const clickHandle = useCallback((path: string) => {
    if (props.clickHandle) {
      props.clickHandle(path)
    } else {
      navigate(path);
    }
  }, [])

  return (
    <AntdLayout className="min-h-screen">
        <Menu
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          emitRouteChange={clickHandle}
        ></Menu>
        <AntdLayout>
          <Header>
            <Button
              type="text"
              className="text-16 h-min"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </Header>
          <Tabs emitRouteChange={clickHandle}/>
          <AntdLayout.Content className="p-24 mx-20 my-16" style={{ backgroundColor: colorBgContainer }}>
            {props.children}
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
  )
}

export default React.memo(Layout)