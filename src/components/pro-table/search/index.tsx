import { defineComponent, toRef, type PropType, ref, computed, type Ref } from 'vue'
import {
  NButton,
  NCascader,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NTreeSelect
} from 'naive-ui'
import { useResizeObserver } from '@vueuse/core'
import type { SearchColumn } from '../typings'
import { COLS, SIZE } from './constants'
import { useForm } from './hooks'
import IconDown from './icon-down'
import styles from './index.module.scss'

const renderField = (form: Ref<any>, { key, searchType, searchOptions }: SearchColumn) => {
  if (searchType === 'input') {
    return <NInput value={form.value[key]} onUpdateValue={(newVal) => (form.value[key] = newVal)} />
  } else if (searchType === 'input-number') {
    return (
      <NInputNumber
        value={form.value[key]}
        clearable
        onUpdateValue={(newVal) => (form.value[key] = newVal)}
      />
    )
  } else if (searchType === 'select') {
    return (
      <NSelect
        value={form.value[key]}
        filterable
        clearable
        options={searchOptions}
        onUpdateValue={(newVal) => (form.value[key] = newVal)}
      />
    )
  } else if (searchType === 'tree-select') {
    return (
      <NTreeSelect
        value={form.value[key]}
        filterable
        clearable
        default-expand-all
        options={searchOptions}
        onUpdateValue={(newVal) => (form.value[key] = newVal)}
      />
    )
  } else if (searchType === 'cascader') {
    return (
      <NCascader
        value={form.value[key]}
        filterable
        clearable
        check-strategy="child"
        options={searchOptions}
        onUpdateValue={(newVal) => (form.value[key] = newVal)}
      />
    )
  } else {
    return <NInput value={form.value[key]} onUpdateValue={(newVal) => (form.value[key] = newVal)} />
  }
}

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<SearchColumn[]>,
      required: true
    }
  },
  setup(props) {
    const columns = toRef(props, 'columns')

    const { form } = useForm(columns)

    const collapsed = ref(true)
    const collapsedRows = ref(1)

    const gridRef = ref<InstanceType<typeof NGrid>>()

    const gridEl = computed(() => gridRef.value?.$refs?.contentEl as HTMLDivElement)

    useResizeObserver(gridEl, ([entry]) => {
      const { width } = entry.contentRect
      collapsedRows.value = width <= SIZE.s ? 2 : 1
    })

    return () => (
      <NForm
        model={form}
        labelPlacement="left"
        labelWidth={105}
        showFeedback={false}
        class={styles['pro-table-search']}
      >
        <NGrid
          ref={gridRef}
          xGap={24}
          yGap={20}
          cols={COLS}
          collapsed={collapsed.value}
          collapsedRows={collapsedRows.value}
        >
          {columns.value.map((column) => (
            <NFormItemGi key={column.key} label={column.title} span={column.searchSpan}>
              {renderField(form, column)}
            </NFormItemGi>
          ))}
          <NFormItemGi suffix span={1} class="pro-table-search__action">
            <NSpace>
              <NButton>重 置</NButton>
              <NButton type="primary">查 询</NButton>
              <NButton
                type="primary"
                text
                icon-placement="right"
                onClick={() => (collapsed.value = !collapsed.value)}
              >
                {{
                  default: () => (collapsed.value ? '展开' : '收起'),
                  icon: () => <IconDown class={{ 'rotate-180deg': !collapsed.value }} />
                }}
              </NButton>
            </NSpace>
          </NFormItemGi>
        </NGrid>
      </NForm>
    )
  }
})