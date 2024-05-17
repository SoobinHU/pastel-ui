// 引入plugin类型
import { Plugin } from 'vue'
export type SFCWithInstall<T> = T & Plugin;
// 通过将 install 方法添加到组件中，可以使这个组件也可以被视为一个插件。当调用 app.use 安装插件时，会自动调用组件的 install 方法，从而将组件注册为全局组件。
export function withInstall<T>(comp:T){
    (comp as SFCWithInstall<T>).install = function(app:any){
        const {name} = comp as unknown as {name:string}
        app.component(name,comp)//将组件注册成全局组件
    }
    return comp as SFCWithInstall<T> 
}