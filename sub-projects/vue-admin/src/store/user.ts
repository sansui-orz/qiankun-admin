import { defineStore, acceptHMRUpdate } from 'pinia'

const defaultState = {
  username: '',
  account: '',
  avatar: '',
  language: localStorage.getItem('language') || 'zh'
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({ ...defaultState }),

  actions: {
    // 需要与主应用关联状态的store, 需要设置该action，主应用调用该方法覆盖数据
    setStoreState(values: typeof defaultState) {
      this.$patch(values)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
