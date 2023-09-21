import { configureStore } from '@reduxjs/toolkit'

import userState, { userStateType, userActionType } from './reducer/user'
import configState, { ConfigStateType, ConfigActionType } from './reducer/config'

type StoreStateType = {
  // 父应用与子应用共享的reducer，应该在子应用先定义好
  userState: userStateType;
  configState: ConfigStateType;
}

const store = configureStore<StoreStateType, userActionType & ConfigActionType>({ reducer: {
  userState,
  configState
} })

export type RootState = ReturnType<typeof store.getState>

export default store