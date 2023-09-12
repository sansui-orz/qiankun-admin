import { createContext } from 'react'

const c = createContext<{ setGlobalState: (arg: { type: string; value: any; }) => void }>({setGlobalState: function() {}})

export default c