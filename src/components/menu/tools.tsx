import React from 'react'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { RootState } from '@/store'
import type { MenuProps } from 'antd'
import { MenuItem as ApiMenuItem } from '@/types/api'

function getMenuIcon(name: string) {
  if (name === '数据中心') return <MailOutlined />
  if (name === '系统管理') return <AppstoreOutlined />
  return undefined
}

export type MenuItem = Required<MenuProps>['items'][number] & {
  children?: MenuItem[],
  url: string
};

export function trasMenus(menus: RootState['menusState']['menus']): MenuItem[] {
  return menus.map(item => {
    return {
      key: item.path || item.name,
      label: item.name,
      type: undefined,
      icon: getMenuIcon(item.name),
      url: item.path,
      children: item.children ? trasMenus(item.children) : undefined
    }
  })
}

export function getActivePath<T extends ApiMenuItem>(menus: MenuItem[] | T[], activePath: string): string | undefined {
  for (let i = 0; i < menus.length; i++) {
    const path = (menus[i] as T).path || (menus[i] as MenuItem).url
    if (path === activePath) {
      return path
    } else if (menus[i].children) {
      const path = getActivePath(menus[i].children!, activePath)
      if (path) return path
    }
  }
  return undefined
}

export function getFirstMenu<T extends ApiMenuItem>(menus: MenuItem[] | T[]): string {
  if (!menus[0].children) return (menus[0] as T).path || (menus[0] as MenuItem).url
  else return getFirstMenu(menus[0].children)
}

export function getTargetMenu<T extends ApiMenuItem>(menus: MenuItem[] | T[], key: string): MenuItem | T | undefined {
  for (let i = 0; i < menus.length; i++) {
    if ((menus[i] as MenuItem)?.key === key || (menus[i] as T)?.path === key) {
      return menus[i]
    } else if (menus[i]?.children) {
      const result = getTargetMenu(menus[i]?.children!, key) as MenuItem | T
      if (result) return result
    }
  }
  return undefined
}