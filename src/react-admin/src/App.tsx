import { ReactNode } from 'react'
import './App.less'

function App(props: { children: ReactNode }) {
  return (
    <div className="react-app">
      { props.children }
    </div>
  )
}

export default App
