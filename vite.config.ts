import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from "@vitejs/plugin-vue-jsx";
import { svgModule } from './config/svgModule'
import alias from './config/alias';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // 一定要开启这个配置项
        }),
      ],
    }),
    vueJsx(),
    svgModule("./src/assets/svg/"),
  ],
  resolve: {
    alias: {
      ...alias,
    },
  },
  css:{
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/styles/variables.less";`,
        javascriptEnabled: true,
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
