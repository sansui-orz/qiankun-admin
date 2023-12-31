import React from "react"

export function useEvent(name: string, callback: any) {
  React.useEffect(() => {
    window.addEventListener(name, callback, false)
    return () => {
      window.removeEventListener(name, callback, false)
    }
  }, [])
}

export function useEmit(name: string, value: any) {
  window.dispatchEvent(new CustomEvent(name, { detail: value }));
}

export function getReact() {
  return React
}