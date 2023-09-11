import { AnyAction } from '@reduxjs/toolkit'
import { getTargetMenu } from '@/components/menu/tools'
import store from '@/store'
import { MenuItem } from '@/types/api';

type addTabAction = { url: string; menus: MenuItem[] }

export interface tabsActionType extends AnyAction {
  type: string;
  value: string | addTabAction;
}

const initState = {
  tabs: [] as Array<{
    url: string;
    name: string;
  }>,
  activePath: ''
}

export type tabsStateType = typeof initState

const reducer = (state = initState, action: tabsActionType) => {
  const tabs = [...state.tabs]
  switch(action.type) {
    case 'addTabs':
      const { url, menus } = action.value as addTabAction
      const targetMenu = getTargetMenu<MenuItem>(menus, url) as MenuItem
      if (!tabs.find(item => item.url === url) && targetMenu) {
        tabs.push({
          url,
          name: targetMenu.name
        })
        return { ...state, tabs, activePath: url }
      } else {
        return state
      }
    case 'setActiveTab':
      return { ...state, activePath: action.value as string }
    case 'deleteTabs':
      if (!tabs.find(item => item.url === action.value)) {
        const index = tabs.findIndex(tab => tab.url === action.value)
        tabs.splice(index, 1)
        let activePath = state.activePath
        return { ...state, tabs, activePath }
      } else {
        return state
      }
    default:
      return state
  }
}

export default reducer