<template>
  <div class="flex items-center px-24px h-44px">
    <span class="flex items-center mr-14px">
      <icon-return class="icon text-20px p-2px mr-6px" />
      <span>确认</span>
    </span>
    <span class="flex items-center mr-14px">
      <icon-up class="icon text-20px p-2px mr-5px" />
      <icon-down class="icon text-20px p-2px mr-6px" />
      <span>切换</span>
    </span>
    <span class="flex items-center">
      <icon-esc class="icon text-20px p-2px mr-6px" />
      <span>关闭</span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { IconUp, IconDown, IconReturn, IconEsc } from './icons'
</script>

<style scoped lang="scss">
.icon {
  box-shadow:
    inset 0 -2px #cdcde6,
    inset 0 0 1px 1px #fff,
    0 1px 2px 1px #1e235a66;
}
</style>
