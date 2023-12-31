import { onMounted, onUnmounted } from 'vue'

export function useEvent(name: string, callback: any) {
  onMounted(() => {
    window.addEventListener(name, callback, false)
  })
  onUnmounted(() => {
    window.removeEventListener(name, callback, false)
  })
}

export function useEmit(name: string, value: any) {
  window.dispatchEvent(new CustomEvent(name, { detail: value }));
}