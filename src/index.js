import { registerMicroApps, start } from 'qiankun'; 

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:8001',
    container: '#root',
    activeRule: '/databoard',
  },
]);

start();
