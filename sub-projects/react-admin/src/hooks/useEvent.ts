import { useEffect } from "react"

export function useEvent(name: string, callback: EventListener) {
  useEffect(() => {
    window.addEventListener(name, callback, false)
    return () => {
      window.removeEventListener(name, callback, false)
    }
  }, [])
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEmit(name: string, value: any) {
  window.dispatchEvent(new CustomEvent(name, { detail: value }));
}