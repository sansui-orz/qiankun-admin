import { configureStore } from '@reduxjs/toolkit'

import tabsState, { tabsStateType, tabsActionType } from './reducer/tabs'
import userState, { userStateType, userActionType } from './reducer/user'
import menusState, { menusStateType, menusActionType } from './reducer/menus'
import configState, { ConfigStateType, ConfigActionType } from './reducer/config'

export type StoreStateType = {
    tabsState: tabsStateType;
    userState: userStateType;
    menusState: menusStateType;
    configState: ConfigStateType;
}

const store = configureStore<StoreStateType, tabsActionType & userActionType & menusActionType & ConfigActionType>({ reducer: {
  tabsState,
  userState,
  menusState,
  configState
} })

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export default store
