<template>
  <div v-if="reloadFlag" class="relative">
    <slot></slot>
    <div v-show="showPlaceholder" :class="['absolute-lt w-full h-full', placeholderClass]">
      <div v-show="loading" class="absolute-center">
        <n-spin :size="loadingSize"></n-spin>
      </div>
      <div v-show="isEmpty" class="absolute-center">
        <div class="relative">
          <icon-empty-data :class="iconClass" />
          <p :class="['absolute-lb w-full text-center', descClass]">
            {{ emptyDesc }}
          </p>
        </div>
      </div>
      <div v-show="!network" class="absolute-center">
        <div :class="['relative', { 'cursor-pointer': showNetworkReload }]" @click="handleReload">
          <icon-network-error :class="iconClass" />
          <p class="absolute-lb w-full text-center" :class="descClass">
            {{ networkErrorDesc }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, watch } from 'vue'
import { NETWORK_ERROR_MSG } from '@/utils'
import { useBoolean } from '@/hooks'

defineOptions({ name: 'LoadingEmptyWrapper' })

interface Props {
  loading: boolean
  empty?: boolean
  loadingSize?: 'small' | 'medium' | 'large'
  placeholderClass?: string
  emptyDesc?: string
  iconClass?: string
  descClass?: string
  showNetworkReload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loadingSize: 'small',
  placeholderClass: 'bg-white dark:bg-dark transition-background-color duration-300 ease-in-out',
  emptyDesc: '暂无数据',
  iconClass: 'text-320px text-primary',
  descClass: 'text-16px text-#666'
})

const { bool: network, setBool: setNetwork } = useBoolean(window.navigator.onLine)
const { bool: reloadFlag, setBool: setReload } = useBoolean(true)

const isEmpty = computed(() => props.empty && !props.loading && network.value)

const showPlaceholder = computed(() => props.loading || isEmpty.value || !network.value)

const networkErrorDesc = computed(() =>
  props.showNetworkReload ? `${NETWORK_ERROR_MSG}，点击重试` : NETWORK_ERROR_MSG
)

const handleReload = () => {
  if (!props.showNetworkReload) return
  setReload(false)
  nextTick(() => {
    setReload(true)
  })
}

watch(
  () => props.loading,
  (newVal) => {
    if (!newVal) {
      setNetwork(window.navigator.onLine)
    }
  }
)
</script>
