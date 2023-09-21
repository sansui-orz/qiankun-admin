import { createRouter, createWebHistory } from 'vue-router'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

import Accounts from '@/pages/accounts/accounts.vue'
import Menus from '@/pages/menus/menus.vue'
import Rules from '@/pages/rules/rules.vue'
import NotFound from '@/pages/404/index.vue'
import StoreActionExample from '@/pages/storeActionExample/storeActionExample.vue'

const routesList = [
  { path: '/', redirect: '/accounts' },
  { path: '/accounts', component: Accounts, meta: { keepAliveName: 'accounts' } },
  { path: '/menus', component: Menus, meta: { keepAliveName: 'menus' } },
  { path: '/rules', component: Rules, meta: { keepAliveName: 'rules' } },
  { path: '/store-action-example-vue', component: StoreActionExample, meta: { keepAliveName: 'store-action-example-vue' } },
  { path: '/404', component: NotFound, meta: {} },
  
]

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  routesList.push({
    path: '/:pathMatch(.*)',
    // @ts-ignore
    redirect: (to: any) => {
      if (to.params?.pathMatch === 'login' && !qiankunWindow.__POWERED_BY_QIANKUN__) {
        window.location.href = qiankunMainAppHost + to.fullPath + '&withToken=true'
        return '/404'
      }
      return '/404'
    }
  })
}

export const routes = routesList



const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/system' : '/'),
  routes
})

export default router
