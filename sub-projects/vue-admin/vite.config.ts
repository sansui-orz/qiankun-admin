import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:8002/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  // define: {
  //   __FEATURE_PROD_DEVTOOLS__: true
  // },
  server: {
    port: 8002,
    cors: true,
    origin: 'http://localhost:8002',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    vue(),
    qiankun('vue3sub', {
      useDevMode: true
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
    federation({
      name: 'vue-admin',
      remoteType: 'module',
      remotes: {
          main_request_vue: "http://localhost:8000/remoteEntryForVue.js",
          format: 'module',
          from: 'webpack'
      },
      shared: ['axios']
    })
  ],
})
