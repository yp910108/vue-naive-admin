<template>
  <n-dropdown
    :show="dropdownVisible"
    :options="options"
    placement="bottom-start"
    :x="x"
    :y="y"
    @clickoutside="hide"
    @select="handleDropdown"
  />
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { useAppStore, useTabStore, type MultiTab } from '@/store'
import IconFullscreen from './icon-fullscreen.vue'
import IconReload from './icon-reload.vue'
import IconCloseCurrent from './icon-close-current.vue'
import IconCloseLeft from './icon-close-left.vue'
import IconCloseRight from './icon-close-right.vue'
import IconCloseOther from './icon-close-other.vue'
import IconCloseAll from './icon-close-all.vue'

interface Props {
  visible?: boolean
  tab?: MultiTab
  /**
   * tab 是否可关闭
   */
  closable?: boolean
  x?: number
  y?: number
}

const props = withDefaults(defineProps<Props>(), { x: 0, y: 0 })

interface Emits {
  (e: 'update:visible', visible: boolean): void
}

const emit = defineEmits<Emits>()

const appStore = useAppStore()
const tabStore = useTabStore()

const dropdownVisible = computed({
  get() {
    return props.visible
  },
  set(newVal) {
    emit('update:visible', newVal)
  }
})

type DropdownKey =
  | 'full-content'
  | 'reload-current'
  | 'close-current'
  | 'close-left'
  | 'close-right'
  | 'close-other'
  | 'close-all'
type Option = DropdownOption & {
  key: DropdownKey
}

const options = computed<Option[]>(() => [
  {
    label: '内容全屏',
    key: 'full-content',
    icon: () => h(IconFullscreen)
  },
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: props.tab?.key !== tabStore.activeTab?.key,
    icon: () => h(IconReload)
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: !props.closable,
    icon: () => h(IconCloseCurrent)
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: () => h(IconCloseLeft)
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: () => h(IconCloseRight)
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: () => h(IconCloseOther)
  },
  {
    label: '关闭所有',
    key: 'close-all',
    icon: () => h(IconCloseAll)
  }
])

const hide = () => {
  dropdownVisible.value = false
}

const actions: Record<DropdownKey, () => void> = {
  'full-content': () => {
    appStore.setContentFull(true)
  },
  'reload-current': () => {
    appStore.reloadPage(props.tab?.key!)
  },
  'close-current': () => {
    tabStore.removeTab(props.tab!)
  },
  'close-left': () => {
    tabStore.clearLeftTabs(props.tab!)
  },
  'close-right': () => {
    tabStore.clearRightTabs(props.tab!)
  },
  'close-other': () => {
    tabStore.clearOtherTabs(props.tab!)
  },
  'close-all': () => {
    tabStore.clearAllTabs()
  }
}

const handleDropdown = (optionKey: DropdownKey) => {
  actions[optionKey]()
  hide()
}
</script>
