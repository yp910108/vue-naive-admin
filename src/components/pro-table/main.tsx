import { computed, defineComponent, ref, type PropType } from 'vue'
import { NCard, NSpace } from 'naive-ui'
import Search, { type ExposedMethods as SearchExposedMethods } from './search'
import type { SearchColumn, TableColumn } from './typings'
import { filterSearchColumns } from './utils'

type ExposedMethods = SearchExposedMethods & {
  reset: () => void
}

interface ProTableExpose {
  new (): ExposedMethods
}

const ProTable = defineComponent({
  props: {
    /**
     * 是否显示搜索栏
     */
    showSearch: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    /**
     * 列、搜索表单配置相关
     * - searchSpan 搜索项占用的列
     * - searchType 搜索项的组件类型
     * - searchOptions 搜索项组件对应的选项内容，当 searchType 为 select、tree-select、cascader 时有效
     * - hideInSearch 列是否在搜索栏中显示
     * - hideInTable 列是否在表格中显示
     */
    columns: {
      type: Array as PropType<TableColumn<any>[]>,
      required: true
    }
  },
  setup(props, { expose }) {
    const searchRef = ref<InstanceType<typeof Search>>()

    const searchColumns = computed<SearchColumn[]>(() => filterSearchColumns(props.columns))

    const exposedMethods: ExposedMethods = {
      setSearchValue: (...args) => searchRef.value?.setSearchValue?.(...args),
      setSearchValues: (...args) => searchRef.value?.setSearchValues?.(...args),
      reset: () => {
        console.log('reset...')
      }
    }

    expose(exposedMethods)

    return () => (
      <NSpace vertical class="h-full" size={16} wrapItem={false}>
        <NCard class="flex-shrink-0 shadow-sm" bordered={false}>
          {props.showSearch && searchColumns.value.length ? (
            <Search ref={searchRef} columns={searchColumns.value} />
          ) : undefined}
        </NCard>
      </NSpace>
    )
  }
})

export default ProTable as typeof ProTable & ProTableExpose
