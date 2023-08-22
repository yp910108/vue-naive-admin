<template>
  <dark-mode-container
    class="app-tab flex-y-center w-full pl-16px"
    :style="{ height: `${theme.tab.height}px` }"
  >
    <div ref="bsWrapper" class="flex-1-hidden h-full">
      <better-scroll
        ref="bsScroll"
        :options="{ scrollX: true, scrollY: false, click: !!deviceInfo.device.type }"
      >
        <tabs @scroll="handleTabsScroll" />
      </better-scroll>
    </div>
    <reload-button />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useElementBounding } from '@vueuse/core'
import { useTabStore, useThemeStore } from '@/store'
import { useDeviceInfo } from './hooks'
import Tabs from './tabs/index.vue'
import ReloadButton from './reload-button.vue'

defineOptions({ name: 'AppTab' })

const route = useRoute()
const tabStore = useTabStore()
const deviceInfo = useDeviceInfo()

const bsWrapper = ref<HTMLElement>()
const { width: bsWrapperWidth, left: bsWrapperLeft } = useElementBounding(bsWrapper)

const bsScroll = ref<Expose.BetterScroll>()

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const handleTabsScroll = (clientX: number) => {
  setTimeout(() => {
    const currentX = clientX - bsWrapperLeft.value
    const deltaX = currentX - bsWrapperWidth.value / 2
    if (bsScroll.value) {
      const { maxScrollX, x } = bsScroll.value.instance
      const scrollX = maxScrollX - x
      const update = deltaX > 0 ? Math.max(-deltaX, scrollX) : Math.min(-deltaX, -x)
      bsScroll.value?.instance.scrollBy(update, 0, 300)
    }
  })
}

watch(route, (newVal) => {
  const newTab = tabStore.addTab(newVal)
  tabStore.setActiveTab(newTab)
})

onMounted(tabStore.initTabStore)
</script>

<style scoped>
.app-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
