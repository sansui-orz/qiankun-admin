import React, { useState, useCallback } from 'react'
import { Tabs as AntdTabs } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useEmit, useRouteChange } from '@/hooks'
import { getFirstMenu } from '@/components/layout/components/menu/tools'
import './index.less'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
interface PropsType {
  emitRouteChange?: (path: string) => void;
}
function Tabs(props: PropsType) {
  const { tabs, activePath } = useSelector<RootState, RootState['tabsState']>((state) => state.tabsState)
  const menus = useSelector<RootState, RootState['menusState']['menus']>((state) => state.menusState.menus)
  const dispatch = useDispatch()
  useRouteChange(location => {
    if (location.pathname !== activePath) {
      if (tabs.find(item => item.url === location.pathname)) {
        dispatch({ type: 'setActiveTab', value: location.pathname })
      } else {
        dispatch({ type: 'setActiveTab', value: '' })
      }
    }
  }, [activePath, tabs])
  
  const onEdit = useCallback((targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      if (tabs.length === 1) {
        let url = getFirstMenu(menus)
        url = url === targetKey ? '/' : url
        props.emitRouteChange && props.emitRouteChange(url)
      } else if (targetKey === activePath) {
        const index = tabs.findIndex(item => item.url === activePath)
        const nextActivePath = tabs[index - 1] || tabs[index + 1] || ''
        dispatch({ type: 'setActiveTab', value: nextActivePath })
        props.emitRouteChange && props.emitRouteChange(nextActivePath.url)
      }
      dispatch({ type: 'deleteTabs', value: targetKey })
      useEmit('removeTab', targetKey)
    }
  }, [menus, tabs, activePath]);
  
  const onTabClick = useCallback((key: string, event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => {
    if (key !== activePath) {
      dispatch({ type: 'setActiveTab', value: key })
      props.emitRouteChange && props.emitRouteChange(key)
    }
  }, [activePath])
  
  return tabs && tabs.length > 0 ? (
    <AntdTabs
      className="main-tabs"
      hideAdd
      activeKey={activePath}
      type="editable-card"
      onEdit={onEdit}
      size="small"
      items={tabs.map(item => ({ label: item.name, children: item + 'children', key: item.url }))}
      onTabClick={onTabClick}
    />
  ) : null
}

export default React.memo(Tabs)