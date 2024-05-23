<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error')
    ]"
  >
    <label :class="bem.e('lable')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <!--若传入插槽则显示插槽 否则默认  -->
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { createNamespace } from '@pim-hu/utils/create'
import {
  FormItemContext,
  FormItemValidateState,
  FormItemContextKey,
  formItemProps,
  FormItemRule,
  Arrayable
} from './form-item'
import { computed, inject, onMounted, provide, ref } from 'vue'
import { FormContextKey } from './form'
import AsyncValdaitor, { Values } from 'async-validator'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps(formItemProps)
defineOptions({
  name: 'p-form-item'
})
const formContext = inject(FormContextKey)
const bem = createNamespace('form-item')

// 表单项状态 成功 失败
const validateState = ref<FormItemValidateState>('')
// 错误信息
const validateMessage = ref('')

const converArray = (
  rules: Arrayable<FormItemRule> | undefined
): FormItemRule[] => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : []
}
//合并form和formItem规则
const _rules = computed(() => {
  const myRules = converArray(props.rules) // 自己的规则
  const formRules = formContext?.rules //父级的规则
  if (formRules && props.prop) {
    const _temp = formRules[props.prop] //找到子组件中的对应属性的规则
    if (_temp) {
      myRules.push(...converArray(_temp)) //放入子组件规则中
    }
  }
  return myRules
})

//过滤出需要检验的rule
const getRuleFiltered = (trigger: string) => {
  //trigger参数是实际上input触发事件的方式 blur change  ''
  // rule.trigger是rule中规定的触发方式
  const rules = _rules.value

  return rules.filter(rule => {
    if (!rule.trigger || !trigger) return true // 这种情况意味着无论如何都要校验
    if (Array.isArray(rule.trigger)) {
      //数组情况
      return rule.trigger.includes(trigger)
    } else {
      //字符串情况
      return rule.trigger === trigger
    }
  })
}
const onValidationSuccesseded = () => {
  validateState.value = 'success'
  validateMessage.value = ''
}
const onValidationFailed = (err: Values) => {
  // console.dir(error)
  validateState.value = 'error'
  const { errors } = err
  validateMessage.value = errors ? errors[0].message : ''
}
//校验回调
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const validate: FormItemContext['validate'] = async (trigger, callback?) => {
  //拿到触发时机，校验是否通过可以调用callback或者调用promise.then方法
  const rules = getRuleFiltered(trigger)
  //formContext?.model数据源 props.prop 校验属性
  console.log('trigger', trigger, rules, formContext?.model, props.prop)
  const modelName = props.prop!
  //借助AsyncValdaitor进行校验 modelName字段名 rules校验规则
  const validator = new AsyncValdaitor({
    [modelName]: rules
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-asserted-optional-chain
  const model = formContext?.model!
  //进行校验
  return validator
    .validate({
      [modelName]: model[modelName]
    })
    .then(() => {
      onValidationSuccesseded()
    })
    .catch((err: Values) => {
      onValidationFailed(err)
      return Promise.reject(err)
    })
}
//获取form传入的所有属性即上下文
const context: FormItemContext = {
  ...props,
  validate
}
//传递出去
provide(FormItemContextKey, context)

onMounted(()=>{
  //把实例传给父组件
  formContext?.addField(context)
})
</script>
