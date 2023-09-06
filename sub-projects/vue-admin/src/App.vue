<script setup lang="ts">
  import { KeepAlive, ref, onMounted, ConcreteComponent, VNode } from 'vue';
  import { RouterView } from 'vue-router'
  import { routes } from '@/router/router'
  import { useEvent } from '@/hooks/useEvent'

  const keepAliveInstance = ref<typeof KeepAlive & { _?: { __v_cache: Map<ConcreteComponent, VNode> }} | null>(null)
  onMounted(() => {
    // @ts-ignore
    console.log('keepAliveInstance', keepAliveInstance.value, keepAliveInstance.value._.__v_cache)
    // if (keepAliveInstance.value)
  })
  useEvent<(key: string) => void>('tagsChange', (key: string) => {
    if (keepAliveInstance?.value?._?.__v_cache) {
      // const target = keepAliveInstance?.value?._?.__v_cache.has(item => item. )
    }
  })

  const keepAlivePages = routes.map(item => item.meta?.keepAliveName || '').filter(item => !!item)
</script>

<template>
  <div class="vue-admin">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keepAlivePages" ref="keepAliveInstance">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped lang="less">
</style>
