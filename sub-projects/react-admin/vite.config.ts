import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import path from 'path'
import qiankun from 'vite-plugin-qiankun'

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
        name: 'react-admin-[name]',
        format: 'umd',
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
    // react(),
    qiankun('reac18', {
      useDevMode: true
    })
  ],
})
