<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>
<script setup lang="ts">
import { createNamespace } from '@pim-hu/utils/create'
import { iconProps } from './icon'
import { computed } from 'vue'

defineOptions({
  name: 'p-icon'
})

const bem = createNamespace('icon')

const props = defineProps(iconProps)

//用计算属性来动态生成一个样式
const style = computed(() => {
  if (!props.size && props.color) return {} //若未传参 则直接返回
  return {
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
    ...(props.color ? { color: props.color } : {})
  }
})
</script>
