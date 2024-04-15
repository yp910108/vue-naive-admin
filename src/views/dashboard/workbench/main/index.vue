<template>
  <n-grid
    :item-responsive="true"
    :x-gap="16"
    :y-gap="16"
    :style="{ '--primary-color': themeVars.primaryColor }"
  >
    <n-grid-item span="0:24 640:24 1024:16">
      <n-space :vertical="true" :size="16">
        <n-card title="项目主要技术栈" :bordered="false" size="small" class="rounded-8px shadow-sm">
          <template #header-extra>
            <a class="text-[var(--primary-color)]" href="javascript:;">更多技术栈</a>
          </template>
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in technology" :key="item.id">
              <technology-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="动态" :bordered="false" size="small" class="rounded-8px shadow-sm">
          <template #header-extra>
            <a class="text-[var(--primary-color)]" href="javascript:;">更多动态</a>
          </template>
          <n-list>
            <n-list-item v-for="item in activity" :key="item.id">
              <template #prefix>
                <icon-avatar class="text-48px" />
              </template>
              <n-thing :title="item.content" :description="item.time" />
            </n-list-item>
          </n-list>
        </n-card>
      </n-space>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:8">
      <n-space :vertical="true" :size="16">
        <n-card title="快捷操作" :bordered="false" size="small" class="rounded-8px shadow-sm">
          <n-grid :item-responsive="true" responsive="screen" cols="m:2 l:3" :x-gap="8" :y-gap="8">
            <n-grid-item v-for="item in shortcuts" :key="item.id">
              <shortcuts-card v-bind="item" />
            </n-grid-item>
          </n-grid>
        </n-card>
        <n-card title="创意" :bordered="false" size="small" class="rounded-8px shadow-sm">
          <div class="flex justify-center items-center h-380px">
            <icon-banner class="text-400px sm:text-320px text-[var(--primary-color)]" />
          </div>
        </n-card>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import IconAvatar from '../component/icon-avatar.vue'
import ShortcutsCard from './shortcuts-card/index.vue'
import TechnologyCard from './technology-card/index.vue'
import IconBanner from './icon-banner.vue'

const themeVars = useThemeVars()

interface Technology {
  id: number
  name: string
  description: string
  author: string
  site: string
  icon: string
  iconColor?: string
}

const technology: Technology[] = [
  {
    id: 0,
    name: 'Vue',
    description: '一套用于构建用户界面的渐进式框架',
    author: '尤雨溪 - Evan You',
    site: 'https://v3.cn.vuejs.org/',
    icon: 'vue'
  },
  {
    id: 1,
    name: 'TypeScript',
    description: 'JavaScript类型的超集，它可以编译成纯JavaScript',
    author: '微软 - Microsoft',
    site: 'https://www.typescriptlang.org/',
    icon: 'typescript-icon'
  },
  {
    id: 2,
    name: 'Vite',
    description: '下一代前端开发与构建工具',
    author: '尤雨溪 - Evan You',
    site: 'https://vitejs.cn/',
    icon: 'vite'
  },
  {
    id: 3,
    name: 'NaiveUI',
    description: '一个 Vue 3 组件库',
    author: '图森未来 - TuSimple',
    site: 'https://www.naiveui.com/zh-CN/os-theme',
    icon: 'naive'
  },
  {
    id: 4,
    name: 'UnoCSS',
    description: '下一代实用优先的CSS框架',
    author: 'Anthony Fu',
    site: 'https://uno.antfu.me/?s=',
    icon: 'uno'
  },
  {
    id: 5,
    name: 'Pinia',
    description: 'vue状态管理框架，支持vue2、vue3',
    author: 'Posva',
    site: 'https://pinia.esm.dev/',
    icon: 'pinia'
  }
]

interface Activity {
  id: number
  content: string
  time: string
}

const activity: Activity[] = [
  {
    id: 4,
    content: 'Admin 刚才把工作台页面随便写了一些，凑合能看了！',
    time: '2021-11-07 22:45:32'
  },
  {
    id: 3,
    content: 'Admin 正在忙于为 vue-naive-admin 写项目说明文档！',
    time: '2021-11-03 20:33:31'
  },
  {
    id: 2,
    content: 'Admin 准备为 vue-naive-admin 1.0的发布做充分的准备工作！',
    time: '2021-10-31 22:43:12'
  },
  {
    id: 1,
    content: '@yanbowe 向 vue-naive-admin 提交了一个 bug，多标签栏不会自适应。',
    time: '2021-10-27 10:24:54'
  },
  {
    id: 0,
    content: 'Admin 在2021年5月28日创建了开源项目 vue-naive-admin！',
    time: '2021-05-28 22:22:22'
  }
]

interface Shortcuts {
  id: number
  label: string
  icon: string
  iconColor: string
}

const shortcuts: Shortcuts[] = [
  { id: 0, label: '主控台', icon: 'mac', iconColor: '#409eff' },
  { id: 1, label: '系统管理', icon: 'setting', iconColor: '#7238d1' },
  { id: 2, label: '权限管理', icon: 'tree', iconColor: '#f56c6c' },
  { id: 3, label: '组件', icon: 'app-store', iconColor: '#19a2f1' },
  { id: 4, label: '表格', icon: 'table', iconColor: '#fab251' },
  { id: 5, label: '图表', icon: 'chart', iconColor: '#8aca6b' }
]
</script>
