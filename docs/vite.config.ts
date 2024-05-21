import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
//vite配置
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [DefineOptions()],
})
