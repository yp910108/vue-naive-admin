<template>
  <n-dropdown trigger="hover" :options="options" :value="language" @select="handleSelect">
    <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
      <icon-language class="text-18px outline-transparent" />
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { localStg } from '@/utils'
import { setLocale, type Lang } from '@/locales'

const { theme } = storeToRefs(useThemeStore())

type Option = {
  label: string
  key: Lang
}

const language = ref<Lang>(localStg.get('lang') ?? 'zh-CN')
const options: Option[] = [
  { label: '中文', key: 'zh-CN' },
  { label: 'English', key: 'en' }
]
const handleSelect = (key: Lang) => {
  language.value = key
  setLocale(key)
  localStg.set('lang', key)
}
</script>
