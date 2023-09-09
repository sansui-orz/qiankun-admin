import { configureStore } from '@reduxjs/toolkit'

import tabsState, { tabsStateType, tabsActionType } from './reducer/tabs'
import userState, { userStateType, userActionType } from './reducer/user'
import menusState, { menusStateType, menusActionType } from './reducer/menus'

type StoreStateType = {
    tabsState: tabsStateType;
    userState: userStateType;
    menusState: menusStateType;
}

const store = configureStore<StoreStateType, tabsActionType & userActionType & menusActionType>({ reducer: {
  tabsState,
  userState,
  menusState
} })

export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

export default store
