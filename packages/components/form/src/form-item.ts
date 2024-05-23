// 定义form-item中的属性
// form-item 这里用来定义 formitem中所需要的属性
// prop 校验的输入框的属性
// label属性 输入框的标题
// rules 表单输入的框的规则
// show-message 是否显示错误 ：true

// change / blur 事件

import type {RuleItem} from 'async-validator'
import { ExtractPropTypes, InjectionKey, PropType } from 'vue'

// 有可能是一个有可能是数组
export type Arrayable<T> = T | T[]

//扩展接口
export interface FormItemRule extends RuleItem{
  trigger?:Arrayable<string>
}

// 表单项状态 成功 失败 或空
export const formItemValidateState = ['success','error',''] as const 
export type FormItemValidateState  = typeof formItemValidateState[number]
export const formItemProps = {
  prop:String,
  label:String,
  // 有可能有一条或多条所以有可能是字符串有可能是数组
  rules:[Object,Array] as PropType<Arrayable<FormItemRule>>,
  showMessage:{
    type:Boolean,
    default:true
  }
}as const

// ExtractPropTypes 是 Vue.js 中一个用于提取组件 props 类型的工具函数。它的主要作用是从组件的 props 定义中提取出 TypeScript 类型信息。
//Partial 的作用将给定类型的所有属性都变为可选
export type FormItemProps =Partial< ExtractPropTypes<typeof formItemProps>>

export interface FormItemContext extends FormItemProps {
  //校验回调
  validate:(trigger:string,callback?:(isValid:boolean)=>void)=> Promise<void>
}
export const FormItemContextKey : InjectionKey<FormItemContext> = Symbol()