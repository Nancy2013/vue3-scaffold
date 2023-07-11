import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'routerPath': fileURLToPath(new URL('./src/router', import.meta.url)),
      'viewsPath': fileURLToPath(new URL('./src/views', import.meta.url)),
      'storePath': fileURLToPath(new URL('./src/store', import.meta.url)),
      'utilsPath': fileURLToPath(new URL('./src/utils', import.meta.url)),
      'servicePath': fileURLToPath(new URL('./src/service', import.meta.url)),
      'stylesPath': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
    },
  },
  css:{
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/styles/variables.less";`
      }
    }
  },
  server: {
    host: "localhost",
    port: 8000,
    open: true, // 热启动
    proxy: {
      "/api": {
        target: "https://op.cn88555.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    fs: { strict: false },
  },
})
