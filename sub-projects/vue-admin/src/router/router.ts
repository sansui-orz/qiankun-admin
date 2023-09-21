import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import Accounts from '@/pages/accounts/accounts.vue'
import Menus from '@/pages/menus/menus.vue'
import Rules from '@/pages/rules/rules.vue'
import StoreActionExample from '@/pages/storeActionExample/storeActionExample.vue'

export const routes = [
  { path: '/', redirect: '/accounts' },
  { path: '/accounts', component: Accounts, meta: { keepAliveName: 'accounts' } },
  { path: '/menus', component: Menus, meta: { keepAliveName: 'menus' } },
  { path: '/rules', component: Rules, meta: { keepAliveName: 'rules' } },
  { path: '/store-action-example-vue', component: StoreActionExample, meta: { keepAliveName: 'store-action-example-vue' } },
]

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/system' : '/'),
  routes
})

export default router
