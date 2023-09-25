import { computed, defineComponent, ref, type PropType } from 'vue'
import { NButton, NCard, NDataTable, NH4, NSpace } from 'naive-ui'
import Search, { type ExposedMethods as SearchExposedMethods } from './search'
import type { SearchColumn, TableColumn } from './typings'
import { filterSearchColumns } from './utils'
import { IconColumnHeight, IconRefresh, IconSetting } from './icons'

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
    },
    data: {
      type: Array as PropType<Record<string, any>[]>,
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
      <NSpace vertical size={16} wrapItem={false} class="h-full">
        {props.showSearch && searchColumns.value.length ? (
          <NCard bordered={false} class="flex-shrink-0 shadow-sm">
            <Search ref={searchRef} columns={searchColumns.value} />
          </NCard>
        ) : undefined}
        <NCard
          class="flex-1 h-0 shadow-sm"
          contentStyle={{ display: 'flex', flexDirection: 'column', height: 0 }}
          bordered={false}
        >
          <NSpace
            size={20}
            wrapItem={false}
            justify="space-between"
            class="flex-shrink-0 items-center"
          >
            <NH4 class="m-0">查询表格</NH4>
            <NSpace class="items-center" wrapItem={false}>
              <NButton type="primary">新 建</NButton>
              <IconRefresh class="font-size-18px cursor-pointer" />
              <IconColumnHeight class="font-size-18px cursor-pointer" />
              <IconSetting class="font-size-18px cursor-pointer" />
            </NSpace>
          </NSpace>
          <NDataTable
            flexHeight
            singleLine={false}
            rowKey={(row) => row.address}
            columns={props.columns}
            data={props.data}
            pagination={{
              pageSlot: 7,
              pageSize: 10,
              prefix: ({ startIndex, endIndex, itemCount }) =>
                `第 ${startIndex + 1}-${endIndex + 1} 条/总共 ${itemCount} 条`,
              showSizePicker: true,
              pageSizes: [10, 20, 50, 100]
            }}
            class="flex-1 mt-16px h-0"
          />
        </NCard>
      </NSpace>
    )
  }
})

export default ProTable as typeof ProTable & ProTableExpose
