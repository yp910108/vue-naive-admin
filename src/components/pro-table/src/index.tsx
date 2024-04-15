import {
  computed,
  defineComponent,
  ref,
  toRef,
  onMounted,
  type CSSProperties,
  type DefineComponent,
  type PropType,
  type VNodeChild
} from 'vue'
import {
  NCard,
  NDataTable,
  NH4,
  NSpace,
  type DataTableColumnKey,
  type DataTableRowKey,
  type PaginationProps
} from 'naive-ui'
import Search, { type Exposed as SearchExposed } from './search'
import type {
  ProTableColumn,
  RenderActionParams,
  RenderContentParams,
  RenderSearchParams,
  RequestParams,
  SearchAction,
  TableAttrs,
  TableLoading,
  TablePagination,
  TableSize
} from './typings'
import { tableExcludeAttrsKeys } from './constants'
import { useColumns } from './hooks'
import { ColumnsSetting, Refresh, SwitchSize } from './toolbar'
import styles from './index.module.scss'

type Data = Record<string, any>

type Exposed = {
  tableData: Data[]
  $elTable: HTMLDivElement
  reload: SearchExposed['reload']
  reset: SearchExposed['reset']
  setSearchDefaultValue: SearchExposed['setDefaultValue']
  setSearchDefaultValues: SearchExposed['setDefaultValues']
  getSearchValue: SearchExposed['getValue']
  getSearchValues: SearchExposed['getValues']
  setSearchValue: SearchExposed['setValue']
  setSearchValues: SearchExposed['setValues']
}

type Search =
  | boolean
  | ((searchParams: RenderSearchParams) => VNodeChild)
  | {
      cols?: number
      labelWidth?: string | number | 'auto'
      clearable?: boolean
      disabled?: boolean
      action?: SearchAction
      showActionCollapse?: boolean
    }

type Action = boolean | ((actionParams: RenderActionParams) => VNodeChild)

type RenderContent = (renderContentParams: RenderContentParams) => VNodeChild

const ProTable = defineComponent({
  inheritAttrs: false,
  props: {
    /**
     * 自定义渲染搜索栏，false 为不显示
     * - labelWidth
     * - action: 自定义渲染搜索栏的操作按钮，false 为不显示
     */
    search: {
      type: [Boolean, Function, Object] as PropType<Search>,
      default: true
    },
    /**
     * 查询条件和表格内容是否分段
     */
    segmented: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    searchStyle: {
      type: [String, Object] as PropType<CSSProperties>
    },
    contentStyle: {
      type: [String, Object] as PropType<CSSProperties>
    },
    /**
     * 表格头部标题
     */
    headerTitle: {
      type: [Boolean, String] as PropType<boolean | string>
    },
    /**
     * 自定义渲染表格操作栏，false 为不显示
     */
    action: {
      type: [Boolean, Function] as PropType<Action>,
      default: true
    },
    /**
     * 自定义渲染表格内容
     */
    renderContent: {
      type: Function as PropType<RenderContent>
    },
    /**
     * 自定义渲染 toolbar
     */
    renderToolbar: {
      type: Function as PropType<() => VNodeChild>
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
    defaultTableLoading: {
      type: Boolean as PropType<TableLoading>
    },
    /**
     * 表格默认分页信息
     */
    defaultPagination: {
      type: [Boolean, Object] as PropType<TablePagination>,
      default: () => ({})
    },
    /**
     * 列、搜索表单配置相关
     * - searchSpan 搜索项占用的列
     * - searchType 搜索项的组件类型
     * - searchOptions 搜索项组件对应的选项内容，当 searchType 为 select、tree-select、cascader 时有效
     * - searchDefaultValue 搜索项默认值，可以为一个方法
     * - searchClearable 搜索项是否可清空
     * - searchDisabled 搜索项是否禁用，可以为一个方法
     * - onSearchChange 搜索项的值修改后调用的方法。也可以设置为一个对象，此时，如果对象的 watch 属性为 true 时，会通过 vue 的 watch 方法
     *   监听 searchValue 的变化。可以通过设置 { watch: true, immediate: ture } 使其在初始化 defaultSearchValue 后强制调用一次。
     * - renderSearchLabel 自定义渲染搜索项的 label
     * - renderSearchField 自定义渲染搜索项的 field
     * - renderSettingLabel 自定义渲染列设置的 label
     * - hideInSearch 列是否在搜索栏中显示
     * - hideInTable 列是否在表格中显示
     */
    columns: {
      type: Array as PropType<ProTableColumn<any>[]>,
      default: () => []
    },
    request: {
      type: Function as PropType<
        (params: RequestParams) => Promise<{
          itemCount?: number
          data?: Data[]
        } | void>
      >
    },
    onAfterRequest: {
      type: Function as PropType<(data: Record<DataTableRowKey, any>[]) => void>
    },
    onSearch: {
      type: Function as PropType<(params?: Record<DataTableRowKey, any>) => void>
    },
    onReset: {
      type: Function as PropType<() => void>
    }
  },
  setup(props, { attrs, expose }) {
    const columns = toRef(props, 'columns')
    const {
      searchColumns,
      settingColumns,
      tableColumns,
      updateColumnsVisible,
      updateColumnsFixed,
      updateColumnsOrder,
      resetColumns
    } = useColumns(columns)

    const restAttrs = computed(() => {
      const result: Record<string, any> = {}
      for (const key of Object.keys(attrs)) {
        if (!tableExcludeAttrsKeys.includes(key)) {
          result[key] = attrs[key]
        }
      }
      return result
    })

    const searchRef = ref<InstanceType<typeof Search>>()

    const tableSize = ref<TableSize>(props.defaultTableSize ?? 'medium')
    const handleUpdateTableSize = (size: TableSize) => {
      tableSize.value = size
    }

    const params = ref<Record<DataTableColumnKey, any>>()

    const loading = ref(props.defaultTableLoading ?? false)

    const mergePagination = () => {
      const _pagination = props.defaultPagination
      const pagination: PaginationProps = {
        pageSlot: 7,
        page: 1,
        pageSize: 20,
        itemCount: 0,
        prefix: ({ startIndex, endIndex, itemCount }) => {
          const strs = [$translate('proTable.pagination.total', { total: itemCount })]
          if (endIndex > startIndex) {
            strs.unshift(
              $translate('proTable.pagination.startEnd', {
                start: startIndex + 1,
                end: endIndex + 1
              })
            )
          }
          return strs.join($translate('proTable.pagination.separator'))
        },
        showSizePicker: true,
        pageSizes: [10, 20, 50, 100]
      }
      return typeof _pagination === 'boolean' ? _pagination : { ...pagination, ..._pagination }
    }
    const pagination = ref(mergePagination())

    const data = ref<Data[]>([])

    const tableRef = ref<InstanceType<typeof NDataTable>>()

    const tableEl = computed(() => tableRef.value?.$el)

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
          if (props.onAfterRequest) {
            props.onAfterRequest(data.value)
          }
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

    const handleSearch = (_params?: Record<DataTableColumnKey, any>) => {
      const { onSearch } = props
      if (onSearch) onSearch(_params)
      setPage(1)
      params.value = _params
      fetch()
    }

    const reload = () => {
      setPage(1)
      if (searchRef.value) {
        searchRef.value.reload()
      } else {
        fetch()
      }
    }

    const reset = () => {
      if (searchRef.value) {
        searchRef.value.reset()
      } else {
        reload()
      }
    }

    const exposed: Exposed = {
      tableData: data as unknown as Data[],
      $elTable: tableEl as unknown as HTMLDivElement,
      reload,
      reset,
      setSearchDefaultValue: (...args) => searchRef.value?.setDefaultValue(...args),
      setSearchDefaultValues: (...args) => searchRef.value?.setDefaultValues(...args),
      getSearchValue: (...args) => searchRef.value?.getValue(...args),
      getSearchValues: (...args) => searchRef.value?.getValues(...args)!,
      setSearchValue: (...args) => searchRef.value?.setValue(...args),
      setSearchValues: (...args) => searchRef.value?.setValues(...args)
    }

    expose(exposed)

    onMounted(() => {
      if (!props.search || typeof props.search === 'function') {
        handleSearch()
      }
    })

    const renderAction = () => [
      <Refresh onRefresh={reload} />,
      <SwitchSize size={tableSize.value} onUpdateSize={handleUpdateTableSize} />,
      <ColumnsSetting
        columns={settingColumns.value}
        onUpdateColumnsVisible={updateColumnsVisible}
        onUpdateColumnsFixed={updateColumnsFixed}
        onUpdateColumnsOrder={updateColumnsOrder}
        onResetColumns={resetColumns}
      />
    ]

    const renderTable = () => (
      // @ts-ignore
      <NDataTable
        ref={tableRef}
        flexHeight
        remote
        bordered={false}
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
        class="flex-grow"
        {...restAttrs.value}
      />
    )

    return () => (
      <NSpace
        vertical
        size={props.segmented ? 10 : 0}
        wrapItem={false}
        class={['h-full', styles['pro-table'], attrs.class]}
        style={attrs.style}
      >
        {props.search ? (
          typeof props.search === 'function' ? (
            props.search({ onSearch: handleSearch })
          ) : (
            <Search
              ref={searchRef}
              columns={searchColumns.value}
              cols={typeof props.search === 'object' ? props.search.cols : undefined}
              labelWidth={typeof props.search === 'object' ? props.search.labelWidth : undefined}
              clearable={typeof props.search === 'object' ? props.search.clearable : undefined}
              disabled={typeof props.search === 'object' ? props.search.disabled : undefined}
              action={typeof props.search === 'object' ? props.search.action : undefined}
              showActionCollapse={
                typeof props.search === 'object' ? props.search.showActionCollapse : undefined
              }
              onSearch={handleSearch}
              onReset={props.onReset}
              class="flex-shrink-0"
              contentStyle={props.searchStyle}
            />
          )
        ) : undefined}
        <NCard
          bordered={false}
          class="flex-grow"
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: props.segmented ? '20px' : '10px',
            ...props.contentStyle
          }}
        >
          {props.headerTitle || props.renderToolbar || props.action ? (
            <NSpace size={20} wrapItem={false} align="center" class="flex-shrink-0 mb-16px">
              {props.headerTitle ? (
                <NH4 class="flex-shrink-0 m-0">{props.headerTitle}</NH4>
              ) : undefined}
              <NSpace wrapItem={false} justify="end" class="flex-grow w-0">
                {props.renderToolbar ? props.renderToolbar() : undefined}
                {props.action
                  ? typeof props.action === 'function'
                    ? props.action({ vnodes: renderAction() })
                    : renderAction()
                  : undefined}
              </NSpace>
            </NSpace>
          ) : undefined}
          {props.renderContent ? props.renderContent({ vnode: renderTable() }) : renderTable()}
        </NCard>
      </NSpace>
    )
  }
})

export default ProTable as typeof ProTable & { new (): Exposed } & DefineComponent<TableAttrs>
