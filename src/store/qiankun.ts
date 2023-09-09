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
  console.log('dispatch ', type, value)
  store.dispatch({ type, value })
  Promise.resolve().then(() => {
    actions.setGlobalState(store.getState())
  })
}
// export type AppDispatch = typeof store.dispatch

export default actions
