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
import { computed } from 'vue'
import type { DropdownOption } from 'naive-ui'
import { renderIcon } from '@/utils'
import { useAppStore, useTabStore } from '@/store'

interface Props {
  visible?: boolean
  tab?: App.GlobalTab
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
  | 'close-other'
  | 'close-left'
  | 'close-right'
  | 'close-all'
type Option = DropdownOption & {
  key: DropdownKey
}

const options = computed<Option[]>(() => [
  {
    label: '内容全屏',
    key: 'full-content',
    icon: renderIcon({ icon: 'fullscreen' })
  },
  {
    label: '重新加载',
    key: 'reload-current',
    disabled: props.tab?.key !== tabStore.activeTab?.key,
    icon: renderIcon({ icon: 'reload-outlined' })
  },
  {
    label: '关闭',
    key: 'close-current',
    disabled: !props.closable,
    icon: renderIcon({ icon: 'close-outlined' })
  },
  {
    label: '关闭其他',
    key: 'close-other',
    icon: renderIcon({ icon: 'column-width-outlined' })
  },
  {
    label: '关闭左侧',
    key: 'close-left',
    icon: renderIcon({ icon: 'format-horizontal-align-left' })
  },
  {
    label: '关闭右侧',
    key: 'close-right',
    icon: renderIcon({ icon: 'format-horizontal-align-right' })
  },
  {
    label: '关闭所有',
    key: 'close-all',
    icon: renderIcon({ icon: 'line-outlined' })
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
    appStore.reloadPage()
  },
  'close-current': () => {
    tabStore.removeTab(props.tab!)
  },
  'close-other': () => {
    tabStore.clearOtherTabs(props.tab!)
  },
  'close-left': () => {
    tabStore.clearLeftTabs(props.tab!)
  },
  'close-right': () => {
    tabStore.clearRightTabs(props.tab!)
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
