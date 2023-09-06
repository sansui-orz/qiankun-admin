<script setup lang="ts">
  import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
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
  </div>
</template>

<style scoped lang="less">
@color: red;
.accounts-pages {
  color: @color;
}
</style>
