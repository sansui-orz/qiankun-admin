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
    case 'setConfig':
      return { ...state, ...(action.value as ConfigStateType) }
  }
  return state
}

export default reducer