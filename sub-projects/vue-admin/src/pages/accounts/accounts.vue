<script setup lang="ts">
  import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
  import { RouterLink } from 'vue-router';
  onMounted(() => {
    console.log('onMounted')
  })
  onUnmounted(() => {
    console.log('onUnmounted')
  })
  onActivated(() => {
    console.log('onActivated')
  })
  onDeactivated(() => {
    console.log('onDeactivated')
  })
</script>

<template>
  <div class="accounts-pages">
    账号管理
    <br />
    <RouterLink :to="'/menus'">导航到菜单</RouterLink>
    <br />
    <RouterLink :to="'/rules'">导航到角色</RouterLink>
  </div>
</template>

<style scoped lang="less">
@color: red;
.accounts-pages {
  color: @color;
}
</style>
