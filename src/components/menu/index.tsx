import React, { useState, useCallback, memo } from 'react'
import type { MenuProps } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu as AntdMenu, theme } from 'antd'
import './index.less'

type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[],
  url: string
};

const { Sider } = Layout

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  url = '',
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    url
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('数据中心', 'sub1', '', <MailOutlined />, [
    getItem('数据看板', '1', '/databoard'),
    getItem('数据详情', '2', '/databoard/detail'),
    getItem('数据表格', '3', '/databoard/data-table'),
  ]),

  getItem('系统管理', 'sub2', '', <AppstoreOutlined />, [
    getItem('账号管理', '5', '/system/accounts'),
    getItem('角色管理', '6', '/system/rules'),
    getItem('菜单管理', '16', '/system/menus'),
    getItem('其他管理', 'sub3', '', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Navigation Three', 'sub4', '', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

function getTargetMenu(menus: MenuItem[], keys: string[]): MenuItem | undefined {
  const key = keys.shift()
  for (let i = 0; i < menus.length; i++) {
    if (menus[i]?.key === key) {
      if (keys.length > 0 && menus[i]?.children) {
        return getTargetMenu(menus[i]?.children!, keys)
      } else if (keys.length === 0) {
        return menus[i]
      }
    }
  }
  return undefined
}

interface iMenuProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  emitRouteChange?: (path: string) => void;
}

function Menu(props: iMenuProps) {
  const collapsed = props.collapsed;
  const [current, setCurrent] = useState('1');

  const onClick: MenuProps['onClick'] = (e) => {
    const target = getTargetMenu(items, e.keyPath.reverse());
    if (target?.url && props.emitRouteChange) {
      props.emitRouteChange(target.url)
    }
    setCurrent(e.key);
  };
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
    <div className="system-logo">logo</div>
    <AntdMenu
      theme="dark"
      onClick={onClick}
      defaultOpenKeys={['sub1']}
      selectedKeys={[current]}
      mode="inline"
      items={items}
    />
  </Sider>
}

export default React.memo(Menu)