import { createContext } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const c = createContext<{ setGlobalState: (arg: { type: string; value: any; }) => void }>({setGlobalState: function() {}})

export default c