import { defineConfig } from 'vite'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'
import federation from "@originjs/vite-plugin-federation";
import externalGlobals from "rollup-plugin-external-globals"

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:8001/',
  server: {
    port: 8001,
    cors: true,
    origin: 'http://localhost:8001',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    rollupOptions: {
      output: {
        name: 'react-admin-[name]'
      }
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  plugins: [
    qiankun('reac18', {
      useDevMode: true
    }),
    externalGlobals({
      React: 'react',
      ReactDom: 'react-dom',
      ReactRouterDom: 'react-router-dom'
    }),
    federation({
      name: 'react-admin',
      remoteType: 'module',
      remotes: {
          main_request: "http://localhost:8000/remoteEntry.js",
          format: 'module',
          from: 'webpack'
      },
      shared: ['axios']
    })
  ],
})
