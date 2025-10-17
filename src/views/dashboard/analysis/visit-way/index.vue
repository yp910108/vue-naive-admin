<template>
  <n-card
    title="访问方式统计"
    :bordered="false"
    class="h-395px shadow-[var(--shadow)]"
    :style="{
      '--shadow': '0 1px 2px rgb(0 21 41 / 8%)'
    }"
  >
    <chart v-if="data?.length" :option="option" />
  </n-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { calculate } from '@/utils'
import { Chart, type ECOption } from '@/components'
import { fetchData } from './service'

const option = computed(() => {
  return {
    series: {
      type: 'pie',
      radius: ['40%', '70%'],
      padAngle: 5,
      itemStyle: {
        borderRadius: 10
      },
      data: data.value?.map((item) => {
        const total = data.value?.reduce((result, { value }) => (result += value ?? 0), 0)
        const percent = calculate(
          'mult',
          calculate('divi', item.value ?? 0, total || 1),
          100
        ).toFixed(2)
        return {
          name: item.name,
          value: item.value,
          label: {
            formatter: `{b} ${percent}%`
          }
        }
      })
    }
  } as ECOption
})

const data = ref<{ name: string; value: number }[]>()

const setData = async () => {
  const res = await fetchData()
  data.value = [
    { name: '网页', value: res?.web! },
    { name: '移动端', value: res?.app! },
    { name: 'Pad', value: res?.pad! },
    { name: '第三方', value: res?.third! },
    { name: '其他', value: res?.other! }
  ]
}

onMounted(setData)
</script>
