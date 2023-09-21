import { AnyAction } from '@reduxjs/toolkit'

export interface ConfigActionType extends AnyAction {
  type: string;
  value: string | ConfigStateType;
}

const initState = {
  name: '',
  version: ''
}

export type ConfigStateType = typeof initState

const reducer = (state = initState, action: ConfigActionType) => {
  switch (action.type) {
    // NOTE: 子应用应该实现set[StateName]State的action, 主应用数据变更时，会调用该action全量更新该state的数据
    case 'setConfigStateState':
      return { ...state, ...(action.value as ConfigStateType) }
  }
  return state
}

export default reducer