<template>
  <n-dropdown
    :show="visible"
    :options="options"
    placement="bottom-start"
    :x="position?.x ?? 0"
    :y="position?.y ?? 0"
    @clickoutside="hide"
    @select="handleSelect"
  />
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { useAppStore, useRouteStore, useTabStore } from '@/store'
import {
  IconReload,
  IconCloseCurrent,
  IconCloseLeft,
  IconCloseRight,
  IconCloseOther,
  IconCloseAll
} from './icons'

type Key =
  | 'reload-current'
  | 'close-current'
  | 'close-left'
  | 'close-right'
  | 'close-other'
  | 'close-all'

type Option = DropdownOption & {
  key: Key
  action: () => void
}

const appStore = useAppStore()

const routeStore = useRouteStore()

const tabStore = useTabStore()

const options = computed<Option[]>(() => [
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: tab.value?.key !== tabStore.activeTab?.key,
    icon: () => <IconReload />,
    action: () => appStore.reloadPage(tab.value?.key!)
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: tab.value?.key === routeStore.rootRoute.name,
    icon: () => <IconCloseCurrent />,
    action: () => tabStore.removeTab(tab.value!)
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: () => <IconCloseLeft />,
    action: () => tabStore.clearLeftTabs(tab.value!)
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: () => <IconCloseRight />,
    action: () => tabStore.clearRightTabs(tab.value!)
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: () => <IconCloseOther />,
    action: () => tabStore.clearOtherTabs(tab.value!)
  },
  {
    label: '关闭所有',
    key: 'close-all',
    icon: () => <IconCloseAll />,
    action: tabStore.clearAllTabs
  }
])

const handleSelect = (_key: Key, option: DropdownOption) => {
  ;(option as Option).action()
  hide()
}

const visible = ref(false)

interface Position {
  x: number
  y: number
}

const tab = ref<Tab.TabItem>()

const position = ref<Position>()

const show = (showParams: { tab: Tab.TabItem; position: Position }) => {
  const _show = () => {
    visible.value = true
    tab.value = showParams.tab
    position.value = showParams.position
  }
  if (visible.value) {
    visible.value = false
    setTimeout(_show, 150)
  } else {
    _show()
  }
}

const hide = () => {
  visible.value = false
}

defineExpose({ show, hide })
</script>
