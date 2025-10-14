<template>
  <div class="app-tab">
    <scroll-pane>
      <ul
        class="app-tab-list"
        :style="{
          '--border-radius': '6px',
          '--bg-color-hover': themeVars.buttonColor2Hover,
          '--bg-color-active': changeColor(themeVars.primaryColor, { alpha: 0.1 }),
          '--text-color-hover': themeVars.primaryColor,
          '--text-color-active': themeVars.primaryColor,
          '--close-bg-color-hover': '#cacaca',
          '--close-bg-color-active': themeVars.primaryColor,
          '--close-text-color-hover': '#fff',
          '--close-text-color-active': '#fff'
        }"
      >
        <li
          v-for="tab of tabStore.tabs"
          :key="tab.key"
          :class="['app-tab-item', { active: tab.key === tabStore.activeTab?.key }]"
          @click="handleItemClick(tab)"
          @contextmenu.prevent="handleContextMenu($event, tab)"
        >
          <icon-tab-left class="app-tab-item__chrome app-tab-item__chrome--left" />
          <icon-tab-right class="app-tab-item__chrome app-tab-item__chrome--right" />
          <span class="app-tab-item__content">
            <component v-if="tab.icon" :is="icons[tab.icon]" class="app-tab-item__icon" />
            {{ tab.title }}
            <i
              v-if="tab.key !== routeStore.rootRoute.name"
              class="app-tab-item__close"
              @click.stop="handleClose(tab)"
            >
              <icon-close />
            </i>
          </span>
        </li>
      </ul>
    </scroll-pane>
    <context-menu ref="contextMenuRef" />
  </div>
</template>

<script setup lang="ts">
import { changeColor } from 'seemly'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { useRouteStore, useTabStore } from '@/store'
import { ScrollPane, icons } from '@/components'
import { IconTabLeft, IconTabRight, IconClose } from './icons'
import ContextMenu from './context-menu/index.vue'

const themeVars = useThemeVars()

const routeStore = useRouteStore()

const router = useRouter()

const handleItemClick = (tab: Tab.TabItem) => {
  router.push(tab.routePath)
}

const tabStore = useTabStore()

const handleClose = (tab: Tab.TabItem) => {
  tabStore.removeTab(tab)
}

const contextMenuRef = ref<InstanceType<typeof ContextMenu>>()

const handleContextMenu = (e: MouseEvent, tab: Tab.TabItem) => {
  contextMenuRef.value?.show({ tab, position: { x: e.clientX, y: e.clientY } })
}

const route = useRoute()

watch(route, (newVal) => {
  const newTab = tabStore.addTab(newVal)
  tabStore.setActiveTab(newTab)
})

onMounted(tabStore.init)
</script>

<style lang="scss" scoped>
.app-tab {
  padding: 8px 16px 0;
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  user-select: none;
  .app-tab-list {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 0 12px;
    .app-tab-item {
      position: relative;
      flex-shrink: 0;
      padding-bottom: 2px;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      cursor: pointer;
      .app-tab-item__chrome {
        position: absolute;
        bottom: 0;
        font-size: 8px;
        color: transparent;
      }
      .app-tab-item__chrome--left {
        left: -8px;
      }
      .app-tab-item__chrome--right {
        right: -8px;
      }
      .app-tab-item__content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 12px;
        height: 28px;
        border-radius: var(--border-radius);
        .app-tab-item__icon {
          margin-top: 2px;
          font-size: 16px;
        }
        .app-tab-item__close {
          border-radius: 50%;
          padding: 1px;
          &:hover {
            background: var(--close-bg-color-hover);
            color: var(--close-text-color-hover);
          }
        }
      }
      &:hover {
        .app-tab-item__content {
          background-color: var(--bg-color-hover);
        }
      }
      &.active {
        background-color: var(--bg-color-active);
        color: var(--text-color-active);
        .app-tab-item__chrome {
          color: var(--bg-color-active);
        }
        .app-tab-item__content {
          background-color: transparent;
        }
        .app-tab-item__close {
          &:hover {
            background: var(--close-bg-color-active);
            color: var(--close-text-color-active);
          }
        }
      }
    }
  }
}
</style>
