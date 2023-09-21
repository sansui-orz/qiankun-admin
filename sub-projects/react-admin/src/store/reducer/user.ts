import { AnyAction } from '@reduxjs/toolkit'
import { UserInfo } from '@/types/api'

export interface userActionType extends AnyAction {
  type: string;
  value: userStateType | string;
}

const initState = {
  username: '',
  account: '',
  avatar: '',
  language: localStorage.getItem('language') || 'zh'
}

export type userStateType = UserInfo

const reducer = (state = initState, action: userActionType) => {
  switch (action.type) {
    // NOTE: 子应用应该实现set[StateName]State的action, 主应用数据变更时，会调用该action全量更新该state的数据
    case 'setUserStateState':
      return { ...(action.value as userStateType) }
  }
  return state
}

export default reducer