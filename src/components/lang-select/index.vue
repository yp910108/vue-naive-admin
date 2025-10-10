<template>
  <n-popselect
    trigger="click"
    :value="locale"
    :options="options"
    @update:value="handleUpdateLocale"
  >
    <icon-wrap>
      <icon-lang />
    </icon-wrap>
  </n-popselect>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/locales'
import { localStg } from '@/utils'
import { IconWrap } from '@/components'
import { IconLang } from './icons'

const options: { value: Lang.Type; label: string }[] = [
  { value: 'zhCN', label: '简体中文' },
  { value: 'enUS', label: 'English' }
]

const { locale } = useI18n()

const handleUpdateLocale = (newLocale: Lang.Type) => {
  setLocale(newLocale)
  localStg.set('lang', newLocale)
}
</script>
