import { computed, defineComponent, ref, type PropType, type DefineComponent } from 'vue'
import {
  type PaginationProps,
  NButton,
  NCard,
  NDataTable,
  NH4,
  NSpace,
  NTooltip,
  NDropdown
} from 'naive-ui'
import { transformObjectTruthy } from '@/utils'
import Search, { type ExposedMethods as SearchExposedMethods } from './search'
import type {
  ProTableColumn,
  TableAttrs,
  TableColumn,
  TableLoading,
  TablePagination,
  TableSize
} from './typings'
import { tableExcludeAttrKeys, tableSizeOptions } from './constants'
import { filterSearchColumns, filterTableColumns } from './utils'
import { IconSize, IconRefresh, IconSetting } from './icons'

type ExposedMethods = SearchExposedMethods & {
  reload: () => void
}

interface ProTableExpose {
  new (): ExposedMethods
}

const ProTable = defineComponent({
  inheritAttrs: false,
  props: {
    /**
     * 是否显示搜索栏
     */
    showSearch: {
      type: Boolean as PropType<Boolean>,
      default: true
    },
    headerTitle: {
      type: String,
      default: '查询表格'
    },
    /**
     * 表格默认大小
     */
    defaultTableSize: {
      type: String as PropType<TableSize>
    },
    /**
     * 表格默认 loading 状态
     */
    defaultLoading: {
      type: Boolean as PropType<TableLoading>
    },
    /**
     * 表格默认分页信息
     */
    defaultPagination: {
      type: Object as PropType<TablePagination>
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
      type: Array as PropType<ProTableColumn<any>[]>,
      required: true
    },
    request: {
      type: Function as PropType<
        (params: any) => Promise<{
          itemCount?: number
          data?: any[]
        }>
      >
    }
  },
  setup(props, { attrs, expose }) {
    const wrapClassName = computed(() => attrs.class)

    const wrapStyle = computed(() => attrs.style)

    const restAttrs = computed(() => {
      const result: Record<string, any> = {}
      for (const key of Object.keys(attrs)) {
        if (!tableExcludeAttrKeys.includes(key)) {
          result[key] = attrs[key]
        }
      }
      return result
    })

    const searchRef = ref<InstanceType<typeof Search>>()

    const searchColumns = computed(() => filterSearchColumns(props.columns))

    const tableSize = ref<TableSize>(props.defaultTableSize ?? 'medium')
    const handleTableSizeSelect = (size: TableSize) => {
      tableSize.value = size
    }

    const tableColumns = computed(() => {
      return filterTableColumns(props.columns).map((column) => {
        const _ellipsis = column.ellipsis
        const ellipsis =
          typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
        return { align: 'center', ...column, ellipsis } as TableColumn
      })
    })

    const params = ref<any>({})

    const loading = ref(props.defaultLoading ?? false)

    const mergePagination = () => {
      const _pagination = props.defaultPagination
      const pagination: PaginationProps = {
        pageSlot: 7,
        page: 1,
        pageSize: 20,
        itemCount: 0,
        prefix: ({ startIndex, endIndex, itemCount }) => {
          const strs = [`总共 ${itemCount} 条`]
          if (endIndex > startIndex) {
            strs.unshift(`第 ${startIndex + 1}-${endIndex + 1} 条`)
          }
          return strs.join('/')
        },
        showSizePicker: true,
        pageSizes: [10, 20, 50, 100]
      }
      return typeof _pagination === 'boolean' ? _pagination : { ...pagination, ..._pagination }
    }
    const pagination = ref(mergePagination())

    const data = ref<any[]>([])

    const fetch = async () => {
      const _params = { ...params.value }
      if (typeof pagination.value !== 'boolean') {
        _params.page = pagination.value.page
        _params.pageSize = pagination.value.pageSize
      }
      const { request } = props
      if (request) {
        try {
          loading.value = true
          const { itemCount, data: _data } = (await request(_params)) ?? {}
          loading.value = false
          if (typeof pagination.value !== 'boolean') {
            pagination.value.itemCount = itemCount ?? 0
          }
          data.value = _data ?? []
        } catch (e) {
          loading.value = false
        }
      }
    }

    const setPage = (page: number) => {
      if (typeof pagination.value !== 'boolean') {
        pagination.value.page = page
      }
    }

    const handleUpatePage = (page: number) => {
      setPage(page)
      fetch()
    }

    const handleUpatePageSize = (pageSize: number) => {
      if (typeof pagination.value !== 'boolean') {
        pagination.value.pageSize = pageSize
      }
      setPage(1)
      fetch()
    }

    const handleSearch = (_params: any) => {
      setPage(1)
      params.value = transformObjectTruthy(_params)
      fetch()
    }

    const reload = () => {
      setPage(1)
      fetch()
    }

    const reset = () => {
      if (searchRef.value) {
        searchRef.value.reset()
      } else {
        reload()
      }
    }

    const exposedMethods: ExposedMethods = {
      reload,
      reset,
      setSearchValue: (...args) => searchRef.value?.setSearchValue(...args),
      setSearchValues: (...args) => searchRef.value?.setSearchValues(...args)
    }

    expose(exposedMethods)

    return () => (
      <NSpace
        vertical
        size={16}
        wrapItem={false}
        class={['h-full', wrapClassName.value]}
        style={wrapStyle.value}
      >
        {props.showSearch && searchColumns.value.length ? (
          <NCard bordered={false} class="flex-shrink-0 shadow-sm">
            <Search ref={searchRef} columns={searchColumns.value} onSearch={handleSearch} />
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
            <NH4 class="m-0">{props.headerTitle}</NH4>
            <NSpace class="items-center" wrapItem={false}>
              <NButton type="primary">新 建</NButton>
              <NTooltip>
                {{
                  default: () => '刷新',
                  trigger: () => (
                    <NButton text onClick={reload}>
                      <IconRefresh class="font-size-18px cursor-pointer" />
                    </NButton>
                  )
                }}
              </NTooltip>
              <NDropdown
                trigger="click"
                show-arrow
                value={tableSize.value}
                options={tableSizeOptions}
                onSelect={handleTableSizeSelect}
              >
                <NTooltip>
                  {{
                    default: () => '密度',
                    trigger: () => (
                      <NButton text>
                        <IconSize class="font-size-18px cursor-pointer" />
                      </NButton>
                    )
                  }}
                </NTooltip>
              </NDropdown>
              <NTooltip>
                {{
                  default: () => '列设置',
                  trigger: () => (
                    <NButton text>
                      <IconSetting class="font-size-18px cursor-pointer" />
                    </NButton>
                  )
                }}
              </NTooltip>
            </NSpace>
          </NSpace>
          {/* @ts-ignore */}
          <NDataTable
            flexHeight
            remote
            size={tableSize.value}
            loading={loading.value}
            // @ts-ignore
            rowKey={(row) => row.id}
            columns={tableColumns.value}
            data={data.value}
            // @ts-ignore
            pagination={pagination.value}
            onUpdatePage={handleUpatePage}
            onUpdatePageSize={handleUpatePageSize}
            class="flex-1 mt-16px h-0"
            {...restAttrs.value}
          />
        </NCard>
      </NSpace>
    )
  }
})

export default ProTable as typeof ProTable & ProTableExpose & DefineComponent<TableAttrs>
