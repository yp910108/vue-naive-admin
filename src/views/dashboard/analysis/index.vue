<template>
  <n-space>
    <n-input />
    <n-button type="primary" @click="handleClick">click</n-button>
    <n-button type="success" @click="handleClick">click</n-button>
  </n-space>
</template>

<script setup lang="ts">
const handleClick = () => {
  const instance = window.$message?.loading('3 * 3 * 4 * 4 * ?', {
    duration: 0
  })

  setTimeout(() => {
    instance?.destroy()
  }, 5000)
}
</script>
