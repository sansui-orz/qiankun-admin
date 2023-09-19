import { useContext } from "react"
import connectMainStoreContext from '@/hooks/context/connectMainStore'

export default function useMainStoreDispatch() {
  const { dispatch } = useContext(connectMainStoreContext)
  return dispatch!
}