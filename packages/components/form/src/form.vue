<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>
<script setup lang="ts">
import { createNamespace } from '@pim-hu/utils/create';
import { FormContext, FormContextKey, formProps } from './form';
import { provide } from 'vue';
import { FormItemContext } from './form-item';
import { Values } from 'async-validator';

const bem = createNamespace('form')
defineOptions({
  name:'p-form'
})
const props = defineProps(formProps)

//将子组件放入数组 收集子组件上下文
const fields : FormItemContext[] = []

//form的校验 在父级中调用子级的校验方法
// 参数包括 valid(表单是否验证通过)和 fields(包含错误信息的对象)
const validate = async (
  callback?: (valid: boolean, fields?: Values) => void
) => {
  let errors: Values = {}
  for (const field of fields) {
    try {
      await field.validate('')//成功的话做校验
    } catch (error) {//失败抛出信息
      errors = {
        ...errors,
        ...(error as Values).fields
      }
    }
  }
  // 没有错误就成功
  if (Object.keys(errors).length === 0) {
    return callback?.(true)
  } else {
    // 有错误就失败
    if (callback) {
      callback?.(false, errors)
    } else {
      return Promise.reject(errors)
    }
  }
}

const addField : FormContext['addField'] = context =>{
  fields.push(context)

  // setTimeout(()=>{
  //   console.log(fields)
  // },1000)
}
const context = {
  ...props,
  addField
}
//将上下文传给formitem
provide(FormContextKey,context)
//暴露校验方法,用户可以通过ref来进行检测
defineExpose({
  validate
})
</script>