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
  ]);
  
  start();
}

export default qiankunInit