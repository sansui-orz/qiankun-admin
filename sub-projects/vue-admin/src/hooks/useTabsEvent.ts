import { ref, inject, KeepAlive, ConcreteComponent, VNode, onMounted } from 'vue';
import { useEvent } from '@/hooks'
import { routes } from '@/router/router'

function useTabsEvent() {
  const keepAliveInstance = ref<typeof KeepAlive & { _?: { __v_cache: Map<ConcreteComponent, VNode> }} | null>(null)
  type f = (args: { type: string; value: any }) => void
  const setGlobalState = inject<f>('setGlobalState')!

  useEvent('removeTab', (event: { detail: string; }) => {
    if (keepAliveInstance?.value?._?.__v_cache && event.detail) {
      const cache = keepAliveInstance?.value?._?.__v_cache
      for (let itemKey of cache.keys()) {
        if (itemKey.__name === event.detail.replace('/system/', '')) {
          cache.delete(itemKey)
          return
        }
      }
    }
  })
  function matchPath() {
    const pathname = window.location.pathname.replace(/^\/system/, '')
    for (let item of routes) {
      if (item.path === pathname && item.meta?.keepAliveName) {
        setGlobalState({ type: 'addTabs', value: item.meta?.keepAliveName })
        return
      }
    }
  }
  onMounted(() => {
    matchPath()
  })
  useEvent('popstate', () => {
    matchPath()
  })
  return keepAliveInstance
}

export default useTabsEvent
