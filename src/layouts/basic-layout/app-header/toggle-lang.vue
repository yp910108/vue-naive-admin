<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted">
    <n-dropdown trigger="hover" :options="options" :value="language" @select="handleSelect">
      <icon-language class="text-18px outline-transparent" />
    </n-dropdown>
  </hover-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/store'
import { localStg } from '@/utils'
import { setLocale } from '@/locales'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const language = ref<I18nType.Lang>(localStg.get('lang') ?? 'zh-CN')
const options = [
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
