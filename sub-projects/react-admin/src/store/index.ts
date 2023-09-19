import { configureStore } from '@reduxjs/toolkit'

import userState, { userStateType, userActionType } from './reducer/user'

type StoreStateType = {
  userState: userStateType;
}

const store = configureStore<StoreStateType, userActionType>({ reducer: {
  userState,
} })

export type RootState = ReturnType<typeof store.getState>

export default store