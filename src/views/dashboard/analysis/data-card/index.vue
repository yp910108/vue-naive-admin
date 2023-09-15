<template>
  <n-card :bordered="false" class="h-full rounded-8px shadow-sm">
    <n-grid cols="s:1 m:2 l:4" responsive="screen" :x-gap="16" :y-gap="16">
      <n-grid-item v-for="item in cardData" :key="item.id">
        <gradient-bg class="h-100px" :start-color="item.colors[0]" :end-color="item.colors[1]">
          <h3 class="text-16px">{{ item.title }}</h3>
          <div class="flex justify-between pt-12px">
            <component :is="iconComponents[item.icon]" class="text-32px" />
            <count-to
              :prefix="item.unit"
              :start-value="1"
              :end-value="item.value"
              class="text-30px text-white dark:text-dark"
            />
          </div>
        </gradient-bg>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import CountTo from '../components/count-to/index.vue'
import GradientBg from './gradient-bg.vue'
import IconChart from './icon-chart.vue'
import IconMoney from './icon-money.vue'
import IconDownload from './icon-download.vue'
import IconTrademark from './icon-trademark.vue'

interface CardData {
  id: string
  title: string
  value: number
  unit: string
  colors: [string, string]
  icon: string
}

const cardData: CardData[] = [
  {
    id: 'visit',
    title: '访问量',
    value: 1000000,
    unit: '',
    colors: ['#ec4786', '#b955a4'],
    icon: 'chart'
  },
  {
    id: 'amount',
    title: '成交额',
    value: 234567.89,
    unit: '$',
    colors: ['#865ec0', '#5144b4'],
    icon: 'money'
  },
  {
    id: 'download',
    title: '下载数',
    value: 666666,
    unit: '',
    colors: ['#56cdf3', '#719de3'],
    icon: 'download'
  },
  {
    id: 'trade',
    title: '成交数',
    value: 999999,
    unit: '',
    colors: ['#fcbc25', '#f68057'],
    icon: 'trademark'
  }
]

type Components = Record<string, Component>

const iconComponents: Components = {
  chart: IconChart,
  money: IconMoney,
  download: IconDownload,
  trademark: IconTrademark
}
</script>
