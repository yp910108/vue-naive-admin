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
import { setLocale } from '@/locales'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

type Option = {
  label: string
  key: I18nType.Lang
}

const language = ref<I18nType.Lang>(localStg.get('lang') ?? 'zh-CN')
const options: Option[] = [
  { label: '中文', key: 'zh-CN' },
  { label: 'English', key: 'en' },
  { label: 'ភាសាខ្មែរ', key: 'km-KH' }
]
const handleSelect = (key: I18nType.Lang) => {
  language.value = key
  setLocale(key)
  localStg.set('lang', key)
}
</script>
