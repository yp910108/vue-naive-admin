<template>
  <div
    class="mb-6px px-4px cursor-pointer"
    :style="{
      '--primary-color': themeVars.primaryColor,
      '--primary-color-active': addColorAlpha(themeVars.primaryColor, 0.1),
      '--border-radius': themeVars.borderRadius
    }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="handleClick"
  >
    <div
      :class="[
        'flex flex-col justify-center items-center py-12px b-rd-[var(--border-radius)] bg-transparent transition-colors duration-300 ease-in-out',
        {
          'text-[var(--primary-color)] !bg-[var(--primary-color-active)]': item.key === activeKey,
          'text-[var(--primary-color)]': isHover
        }
      ]"
    >
      <icon v-if="Icon" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        class="w-full text-center text-12px transition-height duration-300 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis"
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import { addColorAlpha } from '@/utils'
import type { MenuOption } from '@/store'

interface Props {
  item: MenuOption
  activeKey?: string
  isMini: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'change', menus: MenuOption): void
}

const emit = defineEmits<Emits>()

const themeVars = useThemeVars()

const Icon = computed(() => props.item.icon)

const isHover = ref(false)

const handleClick = () => {
  emit('change', props.item)
}
</script>
