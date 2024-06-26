// form 表单的属性
// model
// rules

import { ExtractPropTypes, InjectionKey, PropType } from 'vue'
import { Arrayable, FormItemContext, FormItemRule } from './form-item'

export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>
  },
  showMessage: {
    type: Boolean,
    default: true
  }
} as const

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>

export interface FormContext extends FormProps {
  //把子组件实例放进来
  addField: (field: FormItemContext) => void
}
//将上下文传给formitem
export const FormContextKey: InjectionKey<FormContext> = Symbol()
