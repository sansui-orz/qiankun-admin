<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { useEmit } from '@/hooks/useEvent';
  function onClick() {
    useEmit('removeTag', 'accounts')
  }
</script>

<template>
  <div class="menus-pages">
    菜单管理
    <br />
    <button @click="onClick">清除账号缓存</button>
    <br />
    <RouterLink :to="'/accounts'">导航到账号</RouterLink>
    <br />
    <RouterLink :to="'/rules'">导航到角色</RouterLink>
  </div>
</template>

<style scoped lang="less">
</style>
