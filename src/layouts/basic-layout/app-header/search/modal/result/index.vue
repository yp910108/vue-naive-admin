<template>
  <n-scrollbar>
    <div class="pb-12px">
      <div
        v-for="item of options"
        :key="item.key"
        :style="{
          background: item.key === active ? theme.primaryColor : '',
          color: item.key === active ? '#fff' : ''
        }"
        class="flex justify-between items-center mt-8px h-56px px-14px rounded-4px bg-#e5e7eb dark:bg-dark cursor-pointer"
        @click="handleTo"
        @mouseenter="handleMouseEnter(item)"
      >
        <component v-if="item.icon" :is="item.icon" />
        <span class="flex-1 ml-5px">{{ item.label }}</span>
        <icon-enter class="icon text-20px p-2px mr-3px" />
      </div>
    </div>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore, type SearchMenuOption } from '@/store'
import IconEnter from './icon-enter.vue'

interface Props {
  value?: string
  options: SearchMenuOption[]
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:value', value?: string): void
  (e: 'enter'): void
}

const emit = defineEmits<Emits>()

const { theme } = storeToRefs(useThemeStore())

const active = computed({
  get() {
    return props.value
  },
  set(newVal) {
    emit('update:value', newVal)
  }
})

const handleTo = () => {
  emit('enter')
}

const handleMouseEnter = ({ key }: SearchMenuOption) => {
  active.value = key
}
</script>
