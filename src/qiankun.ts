import { registerMicroApps, start } from 'qiankun';
import connect from '@/store/connectMainStore'

function qiankunInit() {
  registerMicroApps([
    {
      name: 'react-app',
      entry: REACT_SUB_PRODUCT_HOST,
      container: '#root',
      activeRule: (location) => {
        return location.pathname.startsWith('/databoard')
      },
      props:{
        store: connect(['userState', 'configState']) // NOTE: 指明需要共享哪些store给子应用
      }
    },
    {
      name: 'vue-app',
      entry: VUE_SUB_PRODUCT_HOST,
      container: '#root',
      activeRule: (location) => {
        return location.pathname.startsWith('/system')
      },
      props:{
        store: connect(['userState', 'configState']) // NOTE: 指明需要共享哪些store给子应用
      }
    },
  ], {
    // @ts-ignore
    beforeLoad: (app) => {
      // 子应用加载时显示loading
      const loading = document.getElementById('main-loading')
      loading?.setAttribute('style', 'display:flex;')
    },
    
    // @ts-ignore
    afterMount : (app) => {
      // 子应用挂载后隐藏loading
      const loading = document.getElementById('main-loading')
      loading?.setAttribute('style', 'display:none;')
    }
  });
  
  start();
}

export default qiankunInit