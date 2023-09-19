import { createContext } from 'react'
import { AppProps } from '@/App'

const context = createContext<Pick<AppProps, 'dispatch' | 'getMainState'>>({
  dispatch: function() {},
  getMainState: () => ({})
})

export default context