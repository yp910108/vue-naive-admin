<template>
  <div class="flex h-full pr-18px" :class="[isChromeMode ? 'items-end' : 'items-center gap-12px']">
    <PageTab
      ref="tabRef"
      v-for="tab in tabStore.tabs"
      :key="tab.key"
      :mode="theme.tab.mode"
      :dark-mode="theme.darkMode"
      :active="tabStore.activeTab?.key === tab.key"
      :active-color="theme.primaryColor"
      :closable="closeable(tab)"
      @click="handleClick(tab)"
      @close="handleClose(tab)"
      @contextmenu.prevent="handleContextMenu($event, tab)"
    >
      <template #prefix>
        <svg-icon :icon="tab.icon" class="inline-block align-text-bottom text-16px" />
      </template>
      {{ tab.title }}
    </PageTab>
  </div>
  <context-menu v-bind="contextMenuProps" @update:visible="handleDropdownVisible" />
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { PageTab } from '@soybeanjs/vue-materials'
import { useRouteStore, useTabStore, useThemeStore } from '@/store'
import ContextMenu from './context-menu.vue'

interface Emits {
  (e: 'scroll', clientX: number): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const routeStore = useRouteStore()
const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const tabStore = useTabStore()

const isChromeMode = computed(() => theme.value.tab.mode === 'chrome')

const closeable = (tab: App.GlobalTab) => {
  return tab.key !== routeStore.rootRoute.name
}

interface ContextMenuProps {
  visible?: boolean
  tab?: App.GlobalTab
  closable?: boolean
  x?: number
  y?: number
}
const contextMenuProps = ref<ContextMenuProps>({})

const handleClick = (tab: App.GlobalTab) => {
  router.push(tab.routePath)
}

const handleClose = (tab: App.GlobalTab) => {
  tabStore.removeTab(tab)
}

const handleContextMenu = (e: MouseEvent, tab: App.GlobalTab) => {
  const duration = contextMenuProps.value.visible ? 150 : 0
  setTimeout(() => {
    contextMenuProps.value.visible = true
    contextMenuProps.value.tab = tab
    contextMenuProps.value.closable = closeable(tab)
    contextMenuProps.value.x = e.clientX
    contextMenuProps.value.y = e.clientY
  }, duration)
}

const handleDropdownVisible = (visible: boolean) => {
  contextMenuProps.value.visible = visible
}

const tabRef = ref<InstanceType<typeof PageTab>[]>()

watch(
  () => tabStore.activeTab,
  (activeTab) => {
    nextTick(() => {
      const activeTabIndex = tabStore.tabs.findIndex(({ key }) => key === activeTab?.key)
      if (tabRef.value && tabRef.value.length) {
        const activeEl = tabRef.value[activeTabIndex].$el as HTMLDivElement
        const { x, width } = activeEl.getBoundingClientRect()
        const clientX = x + width / 2
        emit('scroll', clientX)
      }
    })
  }
)
</script>
