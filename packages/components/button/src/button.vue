<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled)
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="emitClick"
    @mousedown="emitMouseDown"
  >
    <template v-if="iconPlacement === 'left'">
      <template v-if="slots.icon">
        <p-icon>
          <!-- 动态渲染组件 -->
          <Component :is="slots.icon"></Component>
        </p-icon>
      </template>
    </template>
    <slot></slot>
    <template v-if="iconPlacement === 'right'">
      <template v-if="slots.icon">
        <p-icon>
          <!-- 动态渲染组件 -->
          <Component :is="slots.icon"></Component>
        </p-icon>
      </template>
    </template>
  </button>
</template>
<script setup lang="ts">
import { createNamespace } from '@pim-hu/utils/create'
import { buttonEmits, buttonProps } from './button'
import PIcon from '@pim-hu/components/icon'
import { useSlots } from 'vue'

const bem = createNamespace('button')

defineOptions({
  name: 'p-button',
  inheritAttrs:false //外部属性无法放入元素
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps(buttonProps)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(buttonEmits)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const slots = useSlots()
const emitClick = (e:MouseEvent) => {
  emit('click',e)
}
const emitMouseDown = (e:MouseEvent) => {
  emit('mousedown',e)
}
</script>
