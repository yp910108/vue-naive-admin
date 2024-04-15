<template>
  <n-scrollbar class="max-h-360px" :style="{ '--primary-color': themeVars.primaryColor }">
    <n-list>
      <n-list-item
        v-for="(item, index) in list"
        :key="item.id"
        class="hover:bg-#f6f6f6 dark:hover:bg-dark cursor-pointer"
        @click="handleRead(index)"
      >
        <n-thing :class="['px-15px', { 'opacity-30': item.isRead }]">
          <template #avatar>
            <component
              v-if="item.icon"
              :is="iconComponents[item.icon]"
              class="text-34px text-[var(--primary-color)]"
            />
          </template>
          <template #header>
            <n-ellipsis :line-clamp="1">
              {{ item.title }}
              <template #tooltip>
                {{ item.title }}
              </template>
            </n-ellipsis>
          </template>
          <template v-if="item.tagTitle" #header-extra>
            <n-tag v-bind="item.tagProps" size="small">
              {{ item.tagTitle }}
            </n-tag>
          </template>
          <template #description>
            <n-ellipsis v-if="item.description" :line-clamp="2">
              {{ item.description }}
            </n-ellipsis>
            <p>{{ item.date }}</p>
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
  </n-scrollbar>
</template>
<script setup lang="ts">
import type { Component } from 'vue'
import { useThemeVars } from 'naive-ui'
import type { MessageList } from '../typings'
import IconAvatar from './icon-avatar.vue'
import IconMessage from './icon-message.vue'
import IconTodo from './icon-todo.vue'

interface Props {
  list?: MessageList[]
}

withDefaults(defineProps<Props>(), {
  list: () => []
})

interface Emits {
  (e: 'read', val: number): void
}

const emit = defineEmits<Emits>()

const themeVars = useThemeVars()

type Components = Record<string, Component>

const iconComponents: Components = {
  avatar: IconAvatar,
  message: IconMessage,
  todo: IconTodo
}

const handleRead = (index: number) => {
  emit('read', index)
}
</script>
