import { onMounted, onUnmounted } from 'vue'

export function useEvent<T>(name: string, callback: () => void | T) {
  onMounted(() => {
    document.addEventListener(name, callback, false)
  })
  onUnmounted(() => {
    document.removeEventListener(name, callback, false)
  })
}

export function useEmit(name: string, value: any) {
  document.dispatchEvent(new CustomEvent(name, { detail: value }));
}