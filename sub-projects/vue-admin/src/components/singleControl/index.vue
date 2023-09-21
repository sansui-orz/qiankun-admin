<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FloatButton, Drawer, Tree, Button } from 'ant-design-vue'
import { RouterLink } from 'vue-router';
import request from 'main_for_vue/request';
import { useUserStore } from '@/store/user';
import Cookie from 'js-cookie';

const open = ref(false)
const user = useUserStore()

const menus = [
  {
    title: '账号管理',
    key: 0,
    url: '/accounts'
  },
  {
    title: '权限管理',
    key: 1,
    url: '/rules'
  },
  {
    title: '菜单管理',
    key: 2,
    url: '/menus'
  },
  {
    title: 'store操作示例',
    key: 3,
    url: '/store-action-example-vue'
  }
]

onMounted(async () => {
  const res = await request.get('/config')
  const userInfo = res.data.userInfo
  user.setStoreState(userInfo)
})

const onShow = () => {
  open.value = true
}

const signout = () => {
  Cookie.remove('TOKEN')
  location.href = qiankunMainAppHost + '/login?back=' + encodeURIComponent(location.origin) + '&withToken=true'
}
</script>
<template>
  <div id="single-control">
    <FloatButton @click="onShow"/>
    <Drawer title="子应用菜单功能" :width="300" v-model:open="open">
      <div class="mb-10 border-b-2">登录信息</div>
      <div class="flex items-center justify-between mb-20">
        <div class="text-16">{{ user.username }}</div>
        <Button danger size="small" @click="signout">退出登录</Button>
      </div>
      <div class="mb-10 border-b-2">菜单切换</div>
      <Tree :tree-data="menus">
        <template #title="{ title, key, url }">
          <RouterLink :to="url" :key="key">{{ title }}</RouterLink>
        </template>
      </Tree>
    </Drawer>
  </div>
</template>