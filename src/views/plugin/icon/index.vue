<template>
  <div class="h-full">
    <n-card title="Icon组件示例" :bordered="false" class="rounded-8px shadow-sm">
      <div class="grid grid-cols-10">
        <template v-for="item in icons" :key="item">
          <div class="mt-5px flex-x-center">
            <svg-icon :icon="item" class="text-30px" />
          </div>
        </template>
      </div>
      <div class="mt-50px">
        <h1 class="mb-20px text-18px font-500">Icon 图标选择器</h1>
        <icon-select v-model:value="selectValue" :icons="icons" />
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { icons } from './icons'
import IconSelect from './icon-select.vue'

const selectValue = ref<Icon.IconName>()
</script>
