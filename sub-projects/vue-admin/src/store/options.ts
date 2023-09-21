import { defineStore, acceptHMRUpdate } from 'pinia'
import request from 'main_for_vue/request';

type MenuOptionsType = Array<{ value: number; name: string; }>
type SystemOptionsType = Array<{ value: number; name: string; }>
type RuleOptionsType = Array<{ value: string; name: string; }>

let ruleRequesting = false
let menuRequesting = false
let systemRequesting = false

export const useOptionsStore = defineStore({
  id: 'options',
  state: () => ({
    ruleOptions: [] as RuleOptionsType,
    menuOptions: [] as MenuOptionsType,
    systemOptions: [] as SystemOptionsType
  }),

  actions: {
    async getRuleOptions() {
      if (this.ruleOptions?.length || ruleRequesting) {
        return
      }
      try {
        ruleRequesting = true
        const res = await request.get<RuleOptionsType>('/options/rules')
        this.ruleOptions = res.data
      } finally {
        ruleRequesting = false
      }
    },
    async getMenuOptions() {
      if (this.menuOptions?.length || menuRequesting) {
        return
      }
      try {
        menuRequesting = true
        const res = await request.get<MenuOptionsType>('/options/menus')
        this.menuOptions = res.data
      } finally {
        menuRequesting = false
      }
    },
    async getSystemOptions() {
      if (this.systemOptions?.length || systemRequesting) {
        return
      }
      try {
        systemRequesting = true
        const res = await request.get<SystemOptionsType>('/options/systems')
        this.systemOptions = res.data
      } finally {
        systemRequesting = false
      }
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOptionsStore, import.meta.hot))
}
