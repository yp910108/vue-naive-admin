<template>
  <n-popselect
    trigger="hover"
    :options="options"
    :value="locale"
    @update:value="handleUpdateLocale"
  >
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
  </n-popselect>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/locales'
import { localStg } from '@/utils'
import { useThemeStore } from '@/store'
import { HoverContainer } from '@/components'
import { IconLanguage } from './icons'

interface Props {
  withHoverContainer?: boolean
  containerClass?: string
}

defineProps<Props>()

const { theme } = storeToRefs(useThemeStore())

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
