<template>
  <n-divider title-placement="center">
    {{ $translate('layout.settings.layoutMode.title') }}
  </n-divider>
  <n-space justify="space-around" class="px-12px" :wrap="true" :size="24">
    <div
      v-for="item in modeList"
      :key="item.value"
      :class="[
        'border-2px rounded-6px cursor-pointer hover:border-primary',
        item.value === theme.layout.mode ? 'border-primary' : 'border-transparent'
      ]"
      @click="themeStore.setLayoutMode(item.value)"
    >
      <n-tooltip :placement="placement[item.value]" trigger="hover">
        <template #trigger>
          <div
            :class="[
              'layout-card__shadow gap-6px w-96px h-64px p-6px rd-4px',
              item.value.includes('vertical') ? 'flex' : 'flex-col'
            ]"
          >
            <template v-if="item.value === 'vertical'">
              <div class="w-18px h-full bg-primary:50 rd-4px"></div>
              <div class="flex-1 flex-col gap-6px">
                <div class="h-16px bg-primary rd-4px"></div>
                <div class="flex-1 bg-primary:25 rd-4px"></div>
              </div>
            </template>
            <template v-else-if="item.value === 'vertical-mix'">
              <div class="w-8px h-full bg-primary:50 rd-4px"></div>
              <div class="w-16px h-full bg-primary:50 rd-4px"></div>
              <div class="flex-1 flex-col gap-6px">
                <div class="h-16px bg-primary rd-4px"></div>
                <div class="flex-1 bg-primary:25 rd-4px"></div>
              </div>
            </template>
            <template v-else-if="item.value === 'horizontal'">
              <div class="h-16px bg-primary rd-4px"></div>
              <div class="flex-1 bg-primary:25 rd-4px"></div>
            </template>
            <template v-else>
              <div class="h-16px bg-primary rd-4px"></div>
              <div class="flex-1 flex gap-6px">
                <div class="w-18px bg-primary:50 rd-4px"></div>
                <div class="flex-1 bg-primary:25 rd-4px"></div>
              </div>
            </template>
          </div>
        </template>
        <span>{{ item.label }}</span>
      </n-tooltip>
    </div>
  </n-space>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PopoverPlacement } from 'naive-ui'
import { storeToRefs } from 'pinia'
import type { Settings } from '@/settings'
import type { OptionWithKey } from '@/utils'
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

type LayoutMode = Settings['layout']['mode']

type Placement = Record<LayoutMode, PopoverPlacement>

const placement: Placement = {
  vertical: 'bottom-start',
  'vertical-mix': 'bottom',
  horizontal: 'bottom',
  'horizontal-mix': 'bottom-end'
}

const modeList = computed<OptionWithKey<LayoutMode>[]>(() => [
  {
    value: 'vertical',
    label: $translate('layout.settings.layoutMode.mode.vertical')
  },
  {
    value: 'vertical-mix',
    label: $translate('layout.settings.layoutMode.mode.verticalMix')
  },
  {
    value: 'horizontal',
    label: $translate('layout.settings.layoutMode.mode.horizontal')
  },
  {
    value: 'horizontal-mix',
    label: $translate('layout.settings.layoutMode.mode.horizontalMix')
  }
])
</script>

<style scoped lang="scss">
.layout-card__shadow {
  box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
}
</style>
