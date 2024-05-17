import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@pim-hu/components/icon/'
import '@pim-hu/theme-chalk/src/index.scss'
const plugins = [
    Icon
]
const app = createApp(App)
plugins.forEach(plugin=>app.use(plugin))//注册成全局组件，可以直接使用

app.mount('#app')
