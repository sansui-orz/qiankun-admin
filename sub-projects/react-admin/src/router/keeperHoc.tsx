import { ReactNode, useEffect, useContext } from 'react';
import KeepAlive from 'react-activation'
import SetMainStateContext from '@/hooks/context/setGlobalState'
// import { useEmit } from 'main_hooks/useEvent'

function Keeper(props: { name: string; children: ReactNode }) {
  const { setGlobalState } = useContext(SetMainStateContext)
  useEffect(() => {
    setGlobalState({ type: 'addTabs', value: props.name })
  }, [])
  return (
    <KeepAlive name={props.name} id={props.name}>
      {props.children}
    </KeepAlive>
  )
}

export default function KeeperHoc(name: string, Component: ReactNode): ReactNode {
  return <Keeper key={name} name={name}>{Component}</Keeper>
}