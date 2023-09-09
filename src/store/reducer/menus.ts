import { AnyAction } from '@reduxjs/toolkit'
import { MenuItem } from '@/types/api'
import { getActivePath, getFirstMenu } from '@/components/menu/tools'
export interface menusActionType extends AnyAction {
  type: string;
  value: MenuItem[] | string;
}

const initState = {
  menus: [] as MenuItem[],
  activeMenu: ''
}

export type menusStateType = typeof initState

const reducer = (state = initState, action: menusActionType) => {
  switch(action.type) {
    case 'setMenus':
      const menus = action.value as MenuItem[]
      let path = getActivePath(menus, location.pathname)
      if (path) {
        path = getFirstMenu(menus)
      }
      return { ...state, menus: menus, activeMenu: path! }
    case 'setActiveMenu':
      return { ...state, activeMenu: action.value as string }
  }
  return state
}

export default reducer