<template>
  <n-card
    title="最新动态"
    :bordered="false"
    class="shadow-[var(--shadow)]"
    :style="{
      '--shadow': '0 1px 2px rgb(0 21 41 / 8%)'
    }"
  >
    <n-list hoverable clickable>
      <n-list-item v-for="(item, index) of data" :key="index" class="px-10px">
        <n-flex align="center">
          <n-avatar round :src="item.avatar" class="shrink-0" />
          <n-flex align="flex-end" class="grow-1 w-0">
            <n-flex vertical :size="0" class="grow-1 w-0">
              <n-text>{{ item.name }}</n-text>
              <n-highlight
                :text="getDesc(item.desc)"
                :patterns="getPatterns(item.desc)"
                class="text-12px text-[var(--color)] truncate"
                highlight-class="text-12px bg-transparent text-[var(--highlight-color)]"
                :style="{
                  '--color': themeVars.textColor3,
                  '--highlight-color': themeVars.primaryColor
                }"
              />
            </n-flex>
            <n-text depth="3" class="shrink-0 text-12px">
              {{ item.time }}
            </n-text>
          </n-flex>
        </n-flex>
      </n-list-item>
    </n-list>
  </n-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useThemeVars } from 'naive-ui'
import type { DataItem } from './typings'
import { fetchData } from './service'

const themeVars = useThemeVars()

const getDesc = (desc: string) => {
  return desc.replace(/`/g, '')
}

const getPatterns = (desc: string) => {
  return desc.match(/`[^`]+`/g)?.map((str) => str.replace(/`/g, ''))
}

const data = ref<DataItem[]>()

const setData = async () => {
  const res = await fetchData()
  data.value = res
}

onMounted(setData)
</script>
