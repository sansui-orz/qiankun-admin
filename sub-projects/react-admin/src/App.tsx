import { ReactNode, useCallback, useEffect } from 'react'
import { AliveScope, useAliveController } from 'react-activation'
import { useEvent } from '@/hooks'
import SetMainStateContext from '@/hooks/context/setGlobalState'
import Axios from 'axios'

import './App.less'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function App(props: { children: ReactNode, setGlobalState?: (args: { type: string; value: any }) => void }) {
  const { getCachingNodes } = useAliveController()
  useEvent('removeTab', (event) => {
    const detail = (event as CustomEvent).detail as string
    const cacheingNodes = getCachingNodes()
    console.log('cacheingNodes ', cacheingNodes, detail)
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setGlobalState = useCallback((arg: { type: string; value: any} ) => {
    props.setGlobalState && props.setGlobalState(arg)
  }, [])
  useEffect(() => {
    import('main_request/request').then(res => {
      console.log('res ', res)
      res.default.getAxios().then(_axios => {
        console.log(123333, _axios.default.default, Axios, _axios.default.default === Axios)
      })
    })
  }, [])
  return (
    <div className="react-app">
      <SetMainStateContext.Provider value={{ setGlobalState }}>
        <AliveScope>
          { props.children }
        </AliveScope>
      </SetMainStateContext.Provider>
    </div>
  )
}

export default App
