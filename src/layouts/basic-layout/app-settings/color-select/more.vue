<template>
  <n-modal v-model:show="visible" preset="card" class="w-640px h-480px" :z-index="10001">
    <div class="flex-x-center">
      <n-gradient-text type="primary" :size="24">中国传统颜色</n-gradient-text>
    </div>
    <n-tabs>
      <n-tab-pane
        v-for="item in traditionColors"
        :key="item.label"
        :name="item.label"
        :tab="item.label"
      >
        <n-grid :cols="8" :x-gap="16" :y-gap="8">
          <n-grid-item v-for="i in item.data" :key="i.label">
            <div
              class="flex-center w-full h-36px rounded-4px shadow cursor-pointer"
              :style="{ backgroundColor: i.color }"
              @click="themeStore.setPrimaryColor(i.color)"
            >
              <icon-outline-check
                v-if="i.color === theme.primaryColor"
                :class="['text-20px', isWhite(i.color) ? 'text-gray-700' : 'text-white']"
              />
            </div>
            <p class="text-center">{{ i.label }}</p>
          </n-grid-item>
        </n-grid>
      </n-tab-pane>
    </n-tabs>
  </n-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { traditionColors } from '@/settings'
import { useThemeStore } from '@/store'
import { isWhite } from './helper'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const visible = ref(false)

const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
