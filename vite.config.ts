import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: 'src/auto-import.d.ts'    // 路径下自动生成文件夹存放全局指令
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/components.d.ts",
    }),
  ],
  server: {
    https: false,  // 是否开启 https
    port: 8182,  // 端口号
    host: '0.0.0.0',  // 监听所有地址
    open: true,  // 服务启动时是否自动打开浏览器
    cors: true,   // 允许跨域
    proxy: {},  // 自定义代理规则
  },
  resolve: {
    // 配置别名
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 common.scss 这样就可以在全局中使用 common.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/style/common.scss";'
      }
    }
  },
  build: {
    sourcemap: false,
    // 生产环境关闭输出需设置minify
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    // 生产环境关闭输出
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
          }
        },
      }
    }
  }
})
