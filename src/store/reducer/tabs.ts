import { AnyAction } from '@reduxjs/toolkit'

export interface tabsActionType extends AnyAction {
  type: string;
  value: string;
}

const initState = {
  tabs: [] as string[],
  activePath: ''
}

export type tabsStateType = typeof initState

const reducer = (state = initState, action: tabsActionType) => {
  const tabs = [...state.tabs]
  switch(action.type) {
    case 'addTabs':
      if (!tabs.includes(action.value)) {
        tabs.push(action.value)
        return { ...state, tabs, activePath: action.value }
      } else {
        return state
      }
    case 'setActiveTab':
      return { ...state, activePath: action.value }
    case 'deleteTabs':
      if (tabs.includes(action.value)) {
        const index = tabs.findIndex(tab => tab === action.value)
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