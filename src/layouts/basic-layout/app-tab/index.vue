<template>
  <dark-mode-container
    class="app-tab flex items-center w-full pl-16px"
    :style="{ height: `${theme.tab.height}px` }"
  >
    <scroll-pane ref="scrollRef" class="grow-1 w-0!">
      <tabs @scroll="handleTabsScroll" />
    </scroll-pane>
    <reload-button />
  </dark-mode-container>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTabStore, useThemeStore } from '@/store'
import { DarkModeContainer, ScrollPane } from '@/components'
import Tabs from './tabs/index.vue'
import ReloadButton from './reload-button/index.vue'

defineOptions({ name: 'AppTab' })

const route = useRoute()

const tabStore = useTabStore()

const scrollRef = ref<InstanceType<typeof ScrollPane>>()

const { theme } = storeToRefs(useThemeStore())

const handleTabsScroll = (activeLeft: number, activeWidth: number) => {
  const wrapperWidth = scrollRef.value?.scrollEl?.offsetWidth!
  const deltX = activeLeft - wrapperWidth + (wrapperWidth - activeWidth) / 2
  scrollRef.value?.scrollTo(deltX)
}

watch(route, (newVal) => {
  const newTab = tabStore.addTab(newVal)
  tabStore.setActiveTab(newTab)
})

onMounted(tabStore.init)
</script>

<style scoped>
.app-tab {
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
}
</style>
