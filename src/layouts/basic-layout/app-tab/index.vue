<template>
  <div class="app-tab">
    <scroll-pane>
      <ul
        class="app-tab-list"
        :style="{
          '--border-radius': themeVars.borderRadius,
          // '--border-color': themeVars.borderColor,
          // '--border-color-hover': changeColor(themeVars.primaryColor, { alpha: 0.3 }),
          // '--border-color-active': changeColor(themeVars.primaryColor, { alpha: 0.3 }),
          '--bg-color-hover': themeVars.buttonColor2Hover,
          '--bg-color-active': changeColor(themeVars.primaryColor, { alpha: 0.1 }),
          '--text-color-hover': themeVars.primaryColor,
          '--text-color-active': themeVars.primaryColor,
          '--close-bg-color-hover': '#ccc',
          '--close-bg-color-active': themeVars.primaryColor,
          '--close-text-color-hover': '#fff',
          '--close-text-color-active': '#fff'
        }"
      >
        <li
          v-for="tab of tabStore.tabs"
          :key="tab.key"
          :class="['app-tab-item', { active: tab.key === tabStore.activeTab?.key }]"
        >
          <icon-tab-left class="app-tab-item__chrome app-tab-item__chrome--left" />
          <component v-if="tab.icon" :is="icons[tab.icon]" />
          {{ tab.title }}
          <i v-if="tab.key !== routeStore.rootRoute.name" class="app-tab-item__close">
            <icon-close />
          </i>
          <icon-tab-right class="app-tab-item__chrome app-tab-item__chrome--right" />
        </li>
      </ul>
    </scroll-pane>
  </div>
</template>

<script setup lang="ts">
import { changeColor } from 'seemly'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeVars } from 'naive-ui'
import { useRouteStore, useTabStore } from '@/store'
import { ScrollPane, icons } from '@/components'
import { IconTabLeft, IconTabRight, IconClose } from './icons'

const themeVars = useThemeVars()

const routeStore = useRouteStore()

const tabStore = useTabStore()

const route = useRoute()

watch(route, (newVal) => {
  const newTab = tabStore.addTab(newVal)
  tabStore.setActiveTab(newTab)
})

onMounted(tabStore.init)
</script>

<style lang="scss" scoped>
.app-tab {
  padding: 7px 16px;
  box-shadow: 0 1px 2px rgb(0 21 41 / 8%);
  .app-tab-list {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    .app-tab-item {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
      padding: 0 12px;
      height: 30px;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      cursor: pointer;
      .app-tab-item__chrome {
        position: absolute;
        bottom: 0;
        font-size: 12px;
        color: transparent;
      }
      .app-tab-item__chrome--left {
        left: -12px;
      }
      .app-tab-item__chrome--right {
        right: -12px;
      }
      .app-tab-item__close {
        border-radius: 50%;
        padding: 1px;
        &:hover {
          background: var(--close-bg-color-hover);
          color: var(--close-text-color-hover);
        }
      }
      &:hover {
        background-color: var(--bg-color-hover);
        .app-tab-item__chrome {
          color: var(--bg-color-hover);
        }
      }
      &.active {
        background-color: var(--bg-color-active);
        color: var(--text-color-active);
        .app-tab-item__chrome {
          color: var(--bg-color-active);
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
