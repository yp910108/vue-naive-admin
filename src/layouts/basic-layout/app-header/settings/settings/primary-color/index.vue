<template>
  <n-divider>主题颜色</n-divider>
  <ul class="flex flex-wrap justify-between gap-y-10px">
    <li v-for="item of colorOptions" :key="item.color" class="flex-col-x-center gap-4px">
      <box-select :checked="item.value === settings.primaryColor" class="w-100px h-50px">
        <i
          class="w-20px h-20px bg-[var(--bg-color)] b-rd-[var(--border-radius)]"
          :style="{
            '--bg-color': item.color,
            '--border-radius': themeVars.borderRadius
          }"
        ></i>
      </box-select>
      <n-text depth="3" class="text-12px">{{ item.text }}</n-text>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeVars } from 'naive-ui'
import { useSettingsStore } from '@/store'
import { BoxSelect } from '../../components'
import { COLOR_OPTIONS } from './constants'

const themeVars = useThemeVars()

const { settings } = storeToRefs(useSettingsStore())

const colorOptions = computed(() => [
  { color: themeVars.value.primaryColor, text: '默认', value: 'default' },
  ...COLOR_OPTIONS.map((item) => ({ ...item, value: item.color }))
])
</script>
