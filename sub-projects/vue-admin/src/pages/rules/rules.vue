<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useEmit } from '@/hooks/useEvent';
  function onClick() {
    useEmit('removeTag', 'accounts')
  }
</script>

<template>
  <div class="rules-pages">
    角色管理
    <br />
    <button @click="onClick">清除账号缓存</button>
    <br />
    <RouterLink :to="'/accounts'">导航到账号</RouterLink>
    <br />
    <RouterLink :to="'/menus'">导航到菜单</RouterLink>
  </div>
</template>

<style scoped lang="less">
</style>
