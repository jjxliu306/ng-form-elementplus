import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve('./dist', 'test-ng-form-elementplus.umd.js'),
      name: 'test-ng-form-elementplus',
      fileName: (format) => `test-ng-form-elementplus.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue','element-plus'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  } 
})
