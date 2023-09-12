import { ReactNode, useCallback } from 'react'
import { AliveScope } from 'react-activation'
import SetMainStateContext from '@/hooks/context/setGlobalState'

import './App.less'

type AppProps = {
  children: ReactNode;
  setGlobalState?: (args: { type: string; value: any }) => void;
}

function App(props: AppProps) {
  const setGlobalState = useCallback((arg: { type: string; value: any} ) => {
    props.setGlobalState && props.setGlobalState(arg)
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
