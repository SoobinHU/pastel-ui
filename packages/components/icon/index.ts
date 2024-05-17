//用来整合组件的 最终实现导出组件


import _Icon from './src/icon.vue'
import {withInstall} from '@pim-hu/utils/with-install'

const Icon = withInstall(_Icon)

export default Icon;//可以通过app.use来使用 也可以通过import方式单独使用

export * from './src/icon'

//这里添加的类型 可以在模板中直接解析
declare module 'vue'{
    export interface GlobalComponents {//接口可以自动合并
        PIcon : typeof Icon
    }
}
