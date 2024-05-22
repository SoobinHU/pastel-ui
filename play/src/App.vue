<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'
import { ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createData(level = 4, parentKey = ''): any {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      xx: createLabel(level), // 显示的内容
      key, // 为了唯一性
      children: createData(level - 1, key) // 孩子
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
const data = ref(createData())
console.log(data)
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const handleClick = (e: any) => {
  console.log('点击', e)
}

const handleBlur = (e:FocusEvent) =>{
  console.log((e.target as HTMLInputElement).value,'blur')
}
const handleFocus = (e:FocusEvent) =>{
  console.log((e.target as HTMLInputElement).value,'focus')
}

const username = ref('hello')
</script>

<template>
  <p-icon :color="'red'" :size="40">
    <AddCircle></AddCircle>
  </p-icon>
  <p-icon :color="'yellow'" :size="40">
    <AddCircle></AddCircle>
  </p-icon>

  <!-- <p-tree :data="data" label-field="label" key-field="key" children-field="children"></p-tree> -->
  <p-button
    size="medium"
    type="danger"
    :round="true"
    :disabled="false"
    icon-placement="right"
    @click="handleClick"
    @mousedown="handleClick"
  >
    按钮
    <template #icon>
      <p-icon>
        <AddCircle></AddCircle>
      </p-icon>
    </template>
  </p-button>
  {{ username }}
  <p-input v-model="username" @blur="handleBlur" @focus="handleFocus" placeholder="请输入密码" :show-password="true" :clearable="true">
    <template #prepend>你好</template>
    <template #prefixIcon>
      <p-icon>
        <AddCircle></AddCircle>
      </p-icon>
    </template>

    <!-- <template #sufixIcon>
      <p-icon>
        <AddCircle></AddCircle>
      </p-icon>
    </template> -->
    <template #append>见面</template>
  </p-input>
</template>

<style scoped></style>
