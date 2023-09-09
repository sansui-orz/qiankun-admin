import { useEffect } from "react"

export function useEvent(name: string, callback: any) {
  useEffect(() => {
    window.addEventListener(name, callback, false)
    return () => {
      window.removeEventListener(name, callback, false)
    }
  }, [])
}

export function useEmit(name: string, value: any) {
  window.dispatchEvent(new CustomEvent(name, { detail: value }));
}