import { registerMicroApps, start } from 'qiankun';
import actions from '@/store/qiankun'

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
        actions
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
        actions
      }
    },
  ]);
  
  start();
}

export default qiankunInit