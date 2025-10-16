<template>
  <theme-wrap
    class="flex-y-center justify-between px-20px py-16px b-rd-[var(--border-radius)] shadow-[var(--shadow)]"
    :style="{
      '--border-radius': themeVars.borderRadius,
      '--shadow': '0 1px 2px rgb(0 21 41 / 8%)'
    }"
  >
    <n-flex vertical>
      <n-text depth="3">{{ title }}</n-text>
      <n-text class="text-26px">
        <n-number-animation :from="0" :to="num" show-separator />
      </n-text>
      <n-flex align="center" :size="8">
        <n-text :type="increment < 0 ? 'error' : 'success'" class="flex-y-center text-16px">
          <n-number-animation :from="0" :to="increment" show-separator />%
          <icon-arrow :class="{ 'rotate-180deg': increment < 0 }" />
        </n-text>
        <n-text depth="3" class="mt-2px text-12px">较昨天</n-text>
      </n-flex>
    </n-flex>
    <n-flex
      justify="center"
      align="center"
      class="w-60px h-60px bg-[var(--bg-color)] b-rd-50%"
      :style="{ '--bg-color': changeColor(color, { alpha: 0.1 }) }"
    >
      <component :is="icon" class="text-28px color-[var(--color)]" :style="{ '--color': color }" />
    </n-flex>
  </theme-wrap>
</template>

<script setup lang="ts">
import { changeColor } from 'seemly'
import { useThemeVars } from 'naive-ui'
import { ThemeWrap } from '@/components'
import type { DataItem } from '../../typings'
import { IconArrow } from './icons'

defineProps<DataItem>()

const themeVars = useThemeVars()
</script>
