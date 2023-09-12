import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

export const useLifeEventLog = (name: string) => {
  onMounted(() => {
    console.log(name + ' did mounted')
  })
  onUnmounted(() => {
    console.log(name + ' did unmounted')
  })
  onActivated(() => {
    console.log(name + ' activate')
  })
  onDeactivated(() => {
    console.log(name + ' unactivate')
  })
}