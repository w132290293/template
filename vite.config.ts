import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver, } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite'
import removeConsole from "vite-plugin-remove-console";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
  plugins: [
    vue(),
    removeConsole(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [
        // 预设
        'vue',
        "vue-router",
        'pinia',
        {
          // 'vue-router': ['createRouter'],     // 导入指定的api
          /* 自定义模块 */
          '@/api/index.ts': [['*', 'api']],        // 导入指定文件下的api，并重命名
          '@/stores/index.ts': ['useStore'],        // 导入指定文件下的指定api
        }
      ],
      dirs: ['./src/api'],
      dts: './src/auto-import.d.ts',
      include: [/\.[tj]sx?$/, /\.vue$/], // 匹配的文件，也就是哪些后缀的文件需要自动引入
    }),
    Components({
      dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      dts: './src/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/sass/mixins.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  base: '/wxy',
  server: {
    open: '/',
    host: '192.168.0.151',
    port: 8081,
    proxy: { // 跨域代理
      '/api': {
        // target: 'http://' + env.VUE_APP_BASE_API,
        target: 'http://192.168.0.113:8086/', // 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径把路径变成空字符
      },
      // 代理 WebSocket 或 socket
      // '/socket': {
      //   target: 'ws://192.168.0.218:8080/',
      //   ws: true
      //  }
    }
  }
})
