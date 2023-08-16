<template>
  <div
    class="mb-6px px-4px cursor-pointer"
    @mouseenter="setTrue"
    @mouseleave="setFalse"
    @click="handleClick"
  >
    <div
      :class="[
        'flex-center flex-col py-12px rounded-2px bg-transparent transition-colors duration-300 ease-in-out',
        { 'text-primary !bg-primary_active': item.key === activeKey, 'text-primary': isHover }
      ]"
    >
      <icon v-if="Icon" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        class="w-full text-center ellipsis-text text-12px transition-height duration-300 ease-in-out"
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ item.label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { useBoolean } from '@/hooks'

interface Props {
  item: App.GlobalMenuOption
  activeKey?: string
  isMini: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'change', menus: App.GlobalMenuOption): void
}

const emit = defineEmits<Emits>()

const Icon = computed(() => props.item.icon)

const { bool: isHover, setTrue, setFalse } = useBoolean()

const handleClick = () => {
  emit('change', props.item)
}
</script>
