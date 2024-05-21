import  DefaultTheme from 'vitepress/theme'

import PIcon from '@pim-hu/components/icon'
import '@pim-hu/theme-chalk/src/index.scss'

export default {
  ...DefaultTheme,
  enhanceApp({app}){
    app.use(PIcon)//在vitepress中注册全局组件
  }
}