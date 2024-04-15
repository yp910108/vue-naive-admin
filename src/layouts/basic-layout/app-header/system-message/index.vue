<template>
  <n-popover class="!p-0" trigger="click" placement="bottom">
    <template #trigger>
      <hover-container
        class="relative w-40px h-full"
        :tooltip-content="$translate('layout.header.systemMessage.tooltip')"
        :inverted="theme.header.inverted"
      >
        <icon-notification class="text-18px" />
        <n-badge
          :value="count"
          :max="99"
          :class="['absolute top-10px', count < 10 ? '-right-2px' : '-right-10px']"
        />
      </hover-container>
    </template>
    <n-tabs
      v-model:value="currentTab"
      type="line"
      justify-content="space-evenly"
      :class="[isMobile ? 'w-276px' : 'w-360px']"
    >
      <n-tab-pane v-for="(item, index) of tabData" :key="item.key" :name="index">
        <template #tab>
          <div :class="['flex justify-center items-center', isMobile ? 'w-92px' : 'w-120px']">
            <span class="mr-5px">{{ item.name }}</span>
            <n-badge
              v-bind="item.badgeProps"
              show-zero
              :value="item.list.filter((message) => !message.isRead).length"
              :max="99"
            />
          </div>
        </template>
        <loading-empty
          class="h-360px"
          placeholder-class="bg-$n-color transition-background-color duration-300 ease-in-out"
          :loading="loading"
          :empty="item.list.length === 0"
        >
          <message-list :list="item.list" @read="handleRead" />
        </loading-empty>
      </n-tab-pane>
    </n-tabs>
    <div v-if="showAction" class="flex border-t border-$n-divider-color cursor-pointer">
      <div class="flex-1 text-center py-10px" @click="handleClear">
        {{ $translate('layout.header.systemMessage.tabs.action.clear') }}
      </div>
      <div
        class="flex-1 text-center py-10px border-l border-$n-divider-color"
        @click="handleAllRead"
      >
        {{ $translate('layout.header.systemMessage.tabs.action.allRead') }}
      </div>
      <div
        class="flex-1 text-center py-10px border-l border-$n-divider-color"
        @click="handleLoadMore"
      >
        {{ $translate('layout.header.systemMessage.tabs.action.loadMore') }}
      </div>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { HoverContainer, LoadingEmpty } from '@/components'
import { useMobile } from '../../hooks'
import type { MessageTab } from './typings'
import IconNotification from './icon-notification.vue'
import MessageList from './message-list/index.vue'

const { theme } = storeToRefs(useThemeStore())

const { isMobile } = useMobile()

const tabData = ref<MessageTab[]>([
  {
    key: 1,
    name: $translate('layout.header.systemMessage.tabs.title.notice'),
    badgeProps: { type: 'warning' },
    list: [
      {
        id: 1,
        icon: 'message',
        title: '你收到了 5 条新消息',
        date: '2022-06-17'
      },
      {
        id: 4,
        icon: 'message',
        title: 'Vue Naive Admin 1.0.0 版本正在筹备中',
        date: '2022-06-17'
      },
      {
        id: 2,
        icon: 'message',
        title: 'Vue Naive Admin 0.9.6 版本发布了',
        date: '2022-06-16'
      },
      {
        id: 3,
        icon: 'message',
        title: 'Vue Naive Admin 0.9.5 版本发布了',
        date: '2022-06-07'
      },
      {
        id: 5,
        icon: 'message',
        title:
          '测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题',
        date: '2022-06-17'
      }
    ]
  },
  {
    key: 2,
    name: $translate('layout.header.systemMessage.tabs.title.message'),
    badgeProps: { type: 'error' },
    list: [
      {
        id: 1,
        title: '项目动态',
        icon: 'avatar',
        description: 'Admin 刚才把工作台页面随便写了一些，凑合能看了！',
        date: '2021-11-07 22:45:32'
      },
      {
        id: 2,
        title: '项目动态',
        icon: 'avatar',
        description: 'Admin 正在忙于为 vue-naive-admin 写项目说明文档！',
        date: '2021-11-03 20:33:31'
      },
      {
        id: 3,
        title: '项目动态',
        icon: 'avatar',
        description: 'Admin 准备为 vue-naive-admin 1.0的发布做充分的准备工作！',
        date: '2021-10-31 22:43:12'
      },
      {
        id: 4,
        title: '项目动态',
        icon: 'avatar',
        description: '@yanbowe 向 vue-naive-admin 提交了一个 bug，多标签栏不会自适应。',
        date: '2021-10-27 10:24:54'
      },
      {
        id: 5,
        title: '项目动态',
        icon: 'avatar',
        description: 'Admin 在 2021年5月28 日创建了开源项目 vue-naive-admin！',
        date: '2021-05-28 22:22:22'
      }
    ]
  },
  {
    key: 3,
    name: $translate('layout.header.systemMessage.tabs.title.todo'),
    badgeProps: { type: 'info' },
    list: [
      {
        id: 1,
        icon: 'todo',
        title: '缓存主题配置',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      },
      {
        id: 2,
        icon: 'todo',
        title: '添加锁屏组件、全局Iframe组件',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      },
      {
        id: 3,
        icon: 'todo',
        title: '示例页面完善',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      },
      {
        id: 4,
        icon: 'todo',
        title: '表单、表格示例',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      },
      {
        id: 5,
        icon: 'todo',
        title: '性能优化(优化递归函数)',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      },
      {
        id: 6,
        icon: 'todo',
        title: '精简版(新分支thin)',
        description: '任务正在计划中',
        date: '2022-06-17',
        tagTitle: '未开始',
        tagProps: { type: 'default' }
      }
    ]
  }
])

const count = computed(() => {
  return tabData.value.reduce((count, cur) => {
    return count + cur.list.filter((item) => !item.isRead).length
  }, 0)
})

const currentTab = ref(0)

const loading = ref(false)

const currentList = computed({
  get() {
    return tabData.value[currentTab.value].list
  },
  set(newVal) {
    tabData.value[currentTab.value].list = newVal
  }
})

const handleRead = (index: number) => {
  currentList.value[index].isRead = true
}

const showAction = computed(() => currentList.value.length > 0)

const handleClear = () => {
  currentList.value = []
}

const handleAllRead = () => {
  for (const item of currentList.value) {
    item.isRead = true
  }
}

const handleLoadMore = () => {
  loading.value = true
  setTimeout(() => {
    currentList.value.push(...currentList.value)
    loading.value = false
  }, 1000)
}
</script>
