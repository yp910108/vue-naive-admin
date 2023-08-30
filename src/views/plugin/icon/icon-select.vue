<template>
  <n-popover placement="bottom-end" trigger="click">
    <template #trigger>
      <n-input v-model:value="modelValue" readonly placeholder="点击选择图标">
        <template #suffix>
          <svg-icon :icon="selectedIcon" class="text-30px p-5px" />
        </template>
      </n-input>
    </template>
    <template #header>
      <n-input v-model:value="searchValue" placeholder="搜索图标" />
    </template>
    <div v-if="iconsList && iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
      <span v-for="iconItem in iconsList" :key="iconItem" @click="handleChange(iconItem)">
        <svg-icon
          :icon="iconItem"
          :class="[
            'border-1px border-#d9d9d9 text-30px m-2px p-5px cursor-pointer',
            { 'border-primary': modelValue === iconItem }
          ]"
        />
      </span>
    </div>
    <n-empty v-else class="w-306px" description="你什么也找不到" />
  </n-popover>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Props {
  /**
   * 选中的图标
   */
  value?: Icon.IconName
  /**
   * 图标列表
   */
  icons?: Icon.IconName[]
  /**
   * 未选中图标
   */
  emptyIcon?: Icon.IconName
}

const props = withDefaults(defineProps<Props>(), {
  emptyIcon: 'apps'
})

interface Emits {
  (e: 'update:value', val?: Icon.IconName): void
}

const emit = defineEmits<Emits>()

const modelValue = computed({
  get() {
    return props.value
  },
  set(val) {
    emit('update:value', val)
  }
})

const selectedIcon = computed(() => {
  return modelValue.value ?? props.emptyIcon
})

const searchValue = ref<string>('')

const iconsList = computed(() => props.icons?.filter((v) => v.includes(searchValue.value)))

const handleChange = (iconItem: Icon.IconName) => {
  modelValue.value = iconItem
}
</script>

<style lang="scss" scoped>
:deep(.n-input-wrapper) {
  padding-right: 0;
}
:deep(.n-input__suffix) {
  border: 1px solid #d9d9d9;
}
</style>
