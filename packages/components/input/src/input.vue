<template>
  <div :class="[bem.b()]">
    <div :class="bem.e('group')">
      <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
        <slot name="prepend"></slot>
      </div>
      <div :class="[bem.e('wrapper')]">
        <span v-if="slots.prefixIcon" :class="bem.e('prefix')">
          <slot name="prefixIcon"></slot>
        </span>
        <!-- 是否要显示密码 根据密码可见状态来 -->
        <input
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          v-bind="attrs"
          :class="bem.e('inner')"
          ref="input"
          @input="handleInput"
          @change="handleChange"
          @blur="handleBlur"
          @focus="handleFocus"
        />
        <!-- 点击图标切换密码是否可见 -->
        <p-icon v-if="showPwdVisible" @click="handlePasswordVisible">
          <Eye></Eye>
        </p-icon>
        <!-- 清空 -->
        <p-icon v-if="showClear" @click="clear">
          <Close></Close>
        </p-icon>
        <span v-if="slots.sufixIcon" :class="bem.e('sufix')">
          <slot name="sufixIcon"></slot>
        </span>
      </div>
      <div v-if="slots.append" :class="bem.be('group', 'append')">
        <slot name="append"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Eye, Close } from '@vicons/ionicons5'
import { createNamespace } from '@pim-hu/utils/create'
import { useAttrs, useSlots, watch, ref, onMounted, computed } from 'vue'
import { inputEmits, inputProps } from './input'
import { nextTick } from 'vue'

defineOptions({
  name: 'p-input',
  inheritAttrs: false
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps(inputProps)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(inputEmits)
const bem = createNamespace('input')

const slots = useSlots()
const attrs = useAttrs()

//监控prop里的modelValue的变化
watch(
  () => props.modelValue,
  () => {
    setNativeInput()
  }
)
const input = ref<HTMLInputElement | null>(null)
const setNativeInput = () => {
  const inputEle = input.value
  if (!inputEle) {
    return
  }
  inputEle.value = String(props.modelValue)
}

const focus = async () => {
  await nextTick() //重新获取焦点
  input.value?.focus()
}

//密码显示
const passwordVisible = ref(false)
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
  focus()
}

//是否可以切换密码可见度
const showPwdVisible = computed(() => {
  return (
    props.modelValue && props.showPassword && !props.disabled && !props.readonly
  )
})

//是否清空
const showClear = computed(() => {
  return (
    props.modelValue && props.clearable && !props.disabled && !props.readonly
  )
})
const clear = () => {
  //触发事件把值清空
  emit('input', '')
  emit('update:modelValue', '')
  emit('clear')
  focus()
}
onMounted(() => {
  setNativeInput()
})

//实现双向绑定
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', value)
  emit('update:modelValue', value)
  // 当输入框的值发生变化时,组件会触发 input 事件,并将新的值作为参数传递给父组件。父组件可以监听这个事件,并更新 modelValue 属性。
}
const handleChange = (e: Event) => {
  emit('change', (e.target as HTMLInputElement).value)
}
const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}
const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}
// console.log(props.modelValue)
</script>
