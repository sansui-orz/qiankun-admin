import { inject } from 'vue';

export default function useMainStoreDispatch() {
  type MainDispatchType = (arg: { type: string; value: any }) => void
  const dispatch = inject<MainDispatchType>('dispatch')!
  return dispatch
}