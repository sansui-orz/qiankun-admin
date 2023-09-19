import { registerMicroApps, start } from 'qiankun';
import connect from '@/store/connectMainStore'

function qiankunInit() {
  registerMicroApps([
    {
      name: 'react-app', // app name registered
      entry: '//localhost:8001',
      container: '#root',
      activeRule: (location) => {
        return location.pathname.startsWith('/databoard')
      },
      props:{
        store: connect(['userState'])
      }
    },
    {
      name: 'vue-app', // app name registered
      entry: '//localhost:8002',
      container: '#root',
      activeRule: (location) => {
        return location.pathname.startsWith('/system')
      },
      props:{
        store: connect(['userState'])
      }
    },
  ], {
    // @ts-ignore
    beforeLoad: (app) => {
      console.log('beforeLoad', app.name)
      const loading = document.getElementById('main-loading')
      loading?.setAttribute('style', 'display:flex;')
    },
    
    // @ts-ignore
    afterMount : (app) => {
      console.log('beforeLoad', app.name)
      const loading = document.getElementById('main-loading')
      loading?.setAttribute('style', 'display:none;')
    }
  });
  
  start();
}

export default qiankunInit