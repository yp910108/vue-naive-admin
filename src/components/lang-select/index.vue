<template>
  <n-dropdown trigger="hover" :options="options" :value="language" @select="handleSelect">
    <hover-container
      v-if="withHoverContainer"
      :class="['p11px', containerClass]"
      :inverted="theme.header.inverted"
    >
      <icon-language class="text-18px" />
    </hover-container>
    <div v-else :class="['cursor-pointer p11px', containerClass]">
      <icon-language icon="cil:language" class="text-18px" />
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { localStg } from '@/utils'
import { setLocale, type Lang } from '@/locales'
import { useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import IconLanguage from './icon-language.vue'

interface Props {
  withHoverContainer?: boolean
  containerClass?: string
}

defineProps<Props>()

const { theme } = storeToRefs(useThemeStore())

type Option = {
  label: string
  key: Lang
}

const language = ref<Lang>(localStg.get('lang') ?? 'zhCN')
const options: Option[] = [
  { label: '中文', key: 'zhCN' },
  { label: 'English', key: 'enUS' }
]
const handleSelect = (key: Lang) => {
  language.value = key
  setLocale(key)
  localStg.set('lang', key)
}
</script>
