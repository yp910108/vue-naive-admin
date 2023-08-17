<template>
  <n-modal
    v-model:show="visible"
    preset="card"
    footer-style="padding: 0; margin: 0"
    :segmented="{ footer: 'soft' }"
    :closable="false"
    :class="['fixed left-0 right-0', isMobile ? 'wh-full top-0px rounded-0' : 'w-630px top-50px']"
    @after-leave="handleClose"
  >
    <n-input-group>
      <n-input
        v-model:value="keyword"
        clearable
        placeholder="请输入关键词搜索"
        @input="handleSearch"
      >
        <template #prefix>
          <icon-search class="text-15px text-#c2c2c2" />
        </template>
        <n-button v-if="isMobile" type="primary" ghost @click="handleClose">取消</n-button>
      </n-input>
    </n-input-group>
    <div class="mt-20px">
      <n-empty v-if="!resultOptions?.length" description="暂无搜索结果" />
      <result v-else v-model:value="activePath" :options="resultOptions" @enter="handleEnter" />
    </div>
    <template #footer>
      <search-footer v-if="!isMobile" />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { useBoolean } from '@/hooks'
import { useMenuStore } from '@/store'
import Result from './result.vue'
import SearchFooter from './footer.vue'
import useMobile from '../../mobile'

const router = useRouter()

const menuStore = useMenuStore()

const { isMobile } = useMobile()

const { bool: visible, setTrue, setFalse } = useBoolean()

const keyword = ref<string>()
const activePath = ref<string>()
const resultOptions = shallowRef<App.GlobalSearchMenu[]>()

const search = () => {
  resultOptions.value = menuStore.searchMenus.filter(({ label }) => {
    if (keyword.value) {
      const _keyword = keyword.value?.toLocaleLowerCase()
      return _keyword.includes(label.toLocaleLowerCase().trim())
    } else {
      return false
    }
  })
  if (resultOptions.value.length > 0) {
    activePath.value = resultOptions.value[0].routePath
  } else {
    activePath.value = undefined
  }
}

const handleSearch = useDebounceFn(search)

const handleUp = () => {
  if (!resultOptions.value?.length) return
  const index = resultOptions.value?.findIndex((item) => item.routePath === activePath.value)
  if (index === 0) {
    activePath.value = resultOptions.value?.[resultOptions.value?.length - 1].routePath
  } else {
    activePath.value = resultOptions.value?.[index - 1].routePath
  }
}

const handleDown = () => {
  if (!resultOptions.value?.length) return
  const index = resultOptions.value?.findIndex((item) => item.routePath === activePath.value)
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].routePath
  } else {
    activePath.value = resultOptions.value[index + 1].routePath
  }
}

const handleClose = () => {
  hide()
  setTimeout(() => {
    keyword.value = undefined
    resultOptions.value = undefined
  }, 200)
}

const handleEnter = () => {
  const length = resultOptions.value?.length
  if (!length || !activePath.value) return
  const item = resultOptions.value?.find((item) => item.routePath === activePath.value)
  // TODO href
  router.push({ name: item?.key })
  handleClose()
}

onKeyStroke('Escape', handleClose)
onKeyStroke('Enter', handleEnter)
onKeyStroke('ArrowUp', handleUp)
onKeyStroke('ArrowDown', handleDown)

const show = () => {
  setTrue()
}

const hide = () => {
  setFalse()
}

defineExpose({ show, hide })
</script>
