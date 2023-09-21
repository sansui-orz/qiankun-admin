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
  language: localStorage.getItem('language') || 'zh' // en
}

export type userStateType = UserInfo

const reducer = (state = initState, action: userActionType) => {
  switch (action.type) {
    case 'changeLanguage':
      localStorage.setItem('language', action.value as string)
      return { ...state, language: action.value as string }
    case 'updateUsername':
      return { ...state, username: action.value as string }
    case 'setUserInfo':
      return { ...state, ...(action.value as userStateType) }
  }
  return state
}

export default reducer