import { useEffect } from 'react'
import { useActivate, useUnactivate } from 'react-activation'

export const useLifeEventLog = (name: string) => {
  useEffect(() => {
    console.log(name + ' did mounted')
    return () => {
      console.log(name + ' did unmounted')
    }
  }, [])
  useActivate(() => {
    console.log(name + ' activate')
  })
  useUnactivate(() => {
    console.log(name + ' unactivate')
  })
}