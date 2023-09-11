import { MenuItem } from '@/types/api';
import store, { RootState } from './index'
import { initGlobalState, MicroAppStateActions } from 'qiankun';

type CustomActions = {
  getGlobalState?: () => RootState,
  dispatch?: (args: { type: string; value: any }) => void
}
const actions: MicroAppStateActions & CustomActions = initGlobalState(store.getState())

actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log('onGlobalStateChange', state, prev);
});

actions.getGlobalState = () => {
  return store.getState()
}

actions.dispatch = ({ type, value }) => {
  if (type === 'addTabs') {
    console.log('dispatch')
    store.dispatch((dispatch, getState) => {
        const menus: MenuItem[] = getState().menusState.menus
        return dispatch!({ type, value: { url: value as string, menus } })
    })
  } else {
    store.dispatch({ type, value })
  }
}
// export type AppDispatch = typeof store.dispatch

export default actions
