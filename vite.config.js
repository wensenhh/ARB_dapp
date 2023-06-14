import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    })
  ],
  resolve: {
    alias: {
      /*
        路径别名
        若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径 
      */
      //'@': process.cwd()+'/src'
      //'@':path.resolve('src')
      //'@':path.resolve(__dirname, 'src')
      '@': resolve(__dirname, './src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    },
  },
  // Directory to serve as plain static assets. 
  // Files in this directory are served at / during dev and copied to the root of outDir during build, and are always served or copied as-is without transform. 
  // The value can be either an absolute file system path or a path relative to project root.
  // 静态资源目录，开发模式下会自动放到 / 下，生产模式下会自动放到 outDir 根路径下。
  // 该目录可以配置为文件系统绝对目录或者相对于项目根目录的相对路径
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      // 导入scss预编译程序
      scss: {
        additionalData: '@import "@/public.scss";'
      },
    },
  },
})
