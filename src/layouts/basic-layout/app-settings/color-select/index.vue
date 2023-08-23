<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settingDrawer.systemThemeTitle') }}
  </n-divider>
  <n-grid :cols="8" :x-gap="8" :y-gap="12">
    <n-grid-item v-for="color in theme.themeColorList" :key="color" class="flex-x-center">
      <div
        class="flex-center w-20px h-20px rounded-2px shadow cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="themeStore.setThemeColor(color)"
      >
        <icon-outline-check
          v-if="color === theme.themeColor"
          :class="[isWhite(color) ? 'text-gray-700' : 'text-white']"
        />
      </div>
    </n-grid-item>
  </n-grid>
  <n-space :vertical="true" class="pt-12px">
    <n-color-picker
      :value="theme.themeColor"
      :show-alpha="false"
      @update-value="themeStore.setThemeColor"
    />
    <n-button :block="true" :type="otherColorBtnType" @click="showMore">
      {{ $translate('layout.settingDrawer.systemTheme.moreColors') }}
    </n-button>
  </n-space>
  <more ref="moreRef" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { isInTraditionColors } from '@/settings'
import { useThemeStore } from '@/store'
import { isWhite } from './helper'
import More from './more.vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const moreRef = ref<InstanceType<typeof More>>()

const isInOther = computed(() => isInTraditionColors(theme.value.themeColor))
const otherColorBtnType = computed(() => (isInOther.value ? 'primary' : 'default'))

const showMore = () => {
  moreRef.value?.show()
}
</script>
