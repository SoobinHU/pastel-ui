//定义input所需要的属性

import { ExtractPropTypes, PropType } from "vue";
// eslint-disable-next-line vue/prefer-import-from-vue
import {isString} from '@vue/shared'

//type属性 默认就是text
//modelValue 数据绑定
//placeholder 默认展示的内容
//clearable 清空输入框的内容
//show-password 密码是否显示
//disabled 是否禁用
//readonly 是否为只读
//lable 标签的内容

export const inputProps = {
  type:{
    type:String,
    default:'text'
  },
  modelValue:{
    type:[Number,String] as PropType< string | number>,
    default:''
  },
  placeholder:{
    type:String,
  },
  clearable:{
    type:Boolean,
  },
  showPassword:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
  },
  readonly:{
    type:Boolean,
    default:false
  },
  lable:{
    type:String
  }
}as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  //modelValue 数据绑定时会调用的方法
  'update:modelValue':(value:string) => isString(value),
  input: (value:string) =>  isString(value),
  change: (value:string) =>  isString(value),
  focus:(e:FocusEvent) => e instanceof FocusEvent,
  blur:(e:FocusEvent) => e instanceof FocusEvent,
  clear:()=> true // 清空事件
}
export type InputEmits = typeof inputEmits