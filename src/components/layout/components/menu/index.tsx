import React, { useCallback, useMemo } from 'react'
import { Layout, Menu as AntdMenu } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import type { MenuClickEventHandler } from 'rc-menu/lib/interface'
import { trasMenus, getTargetMenu, getActivePath, MenuItem } from './tools'
import { useRouteChange } from '@/hooks';
import logo from '@/assets/images/logo.png'
import './index.less'
const { Sider } = Layout

interface iMenuProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  emitRouteChange?: (path: string) => void;
}

function getCurrentOpenKey(menus?: MenuItem[]) {
  if (!menus) return
  for (let i = 0; i < menus.length; i++) {
    if (location.pathname === menus[i].url || getCurrentOpenKey(menus[i].children)) {
      return menus[i].key
    }
  }
}

function Menu(props: iMenuProps) {
  const collapsed = props.collapsed;
  const { menus, activeMenu } = useSelector<RootState, RootState['menusState']>(state => state.menusState)
  const memoMenus = useMemo(() => trasMenus(menus || []), [menus])
  const dispatch = useDispatch()
  
  const setActiveMenu = useCallback((key: string) => {
    dispatch({ type: 'setActiveMenu', value: key })
  }, [])

  const onClick = useCallback<MenuClickEventHandler>((e) => {
    const target = getTargetMenu(memoMenus, e.key);
    if (target?.url && props.emitRouteChange) {
      props.emitRouteChange(target.url)
    }
    setActiveMenu(e.key);
  }, [memoMenus]);

  useRouteChange((location) => {
    if (location.pathname !== activeMenu) {
      const activePath = getActivePath(memoMenus, location.pathname)
      setActiveMenu(activePath!);
    }
  }, [memoMenus])

  return <Sider
    breakpoint="lg"
    className='menu-sider'
    collapsible
    collapsed={collapsed}
    trigger={null}
    onBreakpoint={(broken) => {
      props.setCollapsed(broken)
    }}
  >
    <div className="flex items-center justify-center py-10 overflow-hidden system-logo flex-nowrap">
      <img className="w-40 shrink-0" src={logo} />
      {!collapsed ? <span className="ml-10 text-white whitespace-nowrap">微前端管理系统</span> : null}
    </div>
    <AntdMenu
      theme="dark"
      onClick={onClick}
      defaultOpenKeys={[(getCurrentOpenKey(memoMenus) ?? memoMenus[0].key) as string]}
      selectedKeys={[activeMenu]}
      mode="inline"
      items={memoMenus}
    />
  </Sider>
}

export default React.memo(Menu)