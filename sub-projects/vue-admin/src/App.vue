<script setup lang="ts">
  import { KeepAlive } from 'vue';
  import { RouterView } from 'vue-router'
  import { routes } from '@/router/router'
  import { useTabsEvent } from '@/hooks'

  const keepAlivePages = routes.map(item => item.meta?.keepAliveName || '').filter(item => !!item)
  const keepAliveInstance = useTabsEvent()
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
