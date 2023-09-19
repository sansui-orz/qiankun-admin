import { ReactNode, useEffect, useContext } from 'react';
import KeepAlive, { useAliveController } from 'react-activation'
import SetMainStateContext from '@/hooks/context/connectMainStore'
import { useEvent } from '@/hooks'
// import { useEmit } from 'main_hooks/useEvent'

function Keeper(props: { name: string; children: ReactNode }) {
  const { drop } = useAliveController()

  const { dispatch } = useContext(SetMainStateContext)
  useEffect(() => {
    dispatch!({ type: 'addTabs', value: props.name })
  }, [])

  useEvent('removeTab', (event) => {
    const detail = (event as CustomEvent).detail
    if (props.name === detail) {
      drop(detail)
    }
  })
  return (
    <KeepAlive name={props.name} id={props.name}>
      {props.children}
    </KeepAlive>
  )
}

export default function KeeperHoc(name: string, Component: ReactNode): ReactNode {
  return <Keeper key={name} name={name}>{Component}</Keeper>
}