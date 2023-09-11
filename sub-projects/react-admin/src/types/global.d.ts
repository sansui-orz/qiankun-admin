declare module 'main_hooks/useEvent' {
  export const useEvent: <T extends Event>(name: string, callback: (e: T) => void) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const useEmit: (name: string, value: any) => void
  export const getReact: () => typeof React
}

declare module 'main_request/request' {
  export const get: Axios.get
  export const getAxios: () => Promise<Axios>
}