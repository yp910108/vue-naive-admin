<template>
  <div class="flex h-full pr-18px" :class="[isChromeMode ? 'items-end' : 'items-center gap-12px']">
    <PageTab
      ref="tabRef"
      v-for="tab in tabStore.tabs"
      :key="tab.key"
      :mode="theme.tab.mode"
      :dark-mode="theme.darkMode"
      :icon="tab.icon"
      :title="tab.title"
      :active="tabStore.activeTab?.key === tab.key"
      :closeable="closeable(tab)"
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
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
// import { PageTab } from '@soybeanjs/vue-materials'
import { useRouteStore, useTabStore, useThemeStore, type MultiTab } from '@/store'
import PageTab from './page-tab/index.vue'
import ContextMenu from './context-menu.vue'

interface Emits {
  (e: 'scroll', clientX: number): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const routeStore = useRouteStore()
const { theme } = storeToRefs(useThemeStore())
const tabStore = useTabStore()

const isChromeMode = computed(() => theme.value.tab.mode === 'chrome')

const closeable = (tab: MultiTab) => {
  return tab.key !== routeStore.rootRoute.name
}

interface ContextMenuProps {
  visible?: boolean
  tab?: MultiTab
  closable?: boolean
  x?: number
  y?: number
}
const contextMenuProps = ref<ContextMenuProps>({})

const handleClick = (tab: MultiTab) => {
  router.push(tab.routePath)
}

const handleClose = (tab: MultiTab) => {
  tabStore.removeTab(tab)
}

const handleContextMenu = (e: MouseEvent, tab: MultiTab) => {
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
