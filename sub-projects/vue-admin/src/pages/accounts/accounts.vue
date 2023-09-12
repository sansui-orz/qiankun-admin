<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router';
  import { useLifeEventLog } from '@/hooks'
  useLifeEventLog('accounts')
  const count = ref(0)
  function onClick() {
    count.value += 1
  }
</script>

<template>
  <div class="accounts-pages">
    账号管理<br/>
    <div>{{count}}</div>
    <button @click="onClick">+1</button>
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
