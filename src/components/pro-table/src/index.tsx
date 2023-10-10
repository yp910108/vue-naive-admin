import {
  computed,
  defineComponent,
  ref,
  toRef,
  onMounted,
  type DefineComponent,
  type PropType,
  type VNodeChild
} from 'vue'
import { type PaginationProps, NCard, NDataTable, NH4, NSpace } from 'naive-ui'
import { transformObjectTruthy } from '@/utils'
import Search, { type ExposedMethods as SearchExposedMethods } from './search'
import type {
  ProTableColumn,
  RenderActionParams,
  RenderContentParams,
  RenderSearchParams,
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

type ExposedMethods = SearchExposedMethods & {
  reload: () => void
}

interface ProTableExpose {
  new (): ExposedMethods
}

type Search =
  | boolean
  | ((searchParams: RenderSearchParams) => VNodeChild)
  | {
      labelWidth?: string | number | 'auto'
      action?: SearchAction
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
     * - searchDefaultValue 搜索项默认的值
     * - renderSearchLabel 自定义渲染搜索项的 label
     * - renderSearchField 自定义渲染搜索项的 field
     * - renderSettingLabel 自定义渲染列设置的 label
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
    },
    onAfterRequest: {
      type: Function as PropType<(data: any[]) => void>
    }
  },
  setup(props, { attrs, expose }) {
    const columns = toRef(props, 'columns')
    const {
      searchColumns,
      settingColumns,
      tableColumns,
      updateColumnsVisible,
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

    const params = ref<any>({})

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

    const handleSearch = (_params?: any) => {
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
        onUpdateColumnsOrder={updateColumnsOrder}
        onResetColumns={resetColumns}
      />
    ]

    const renderTable = () => (
      // @ts-ignore
      <NDataTable
        flexHeight
        remote
        bordered={false}
        size={tableSize.value}
        loading={loading.value}
        // @ts-ignore
        rowKey={(row) => row.id}
        columns={tableColumns.value}
        data={data.value}
        pagination={pagination.value}
        onUpdatePage={handleUpatePage}
        onUpdatePageSize={handleUpatePageSize}
        class="flex-grow h-0"
        {...restAttrs.value}
      />
    )

    return () => (
      <NSpace
        vertical
        size={props.segmented ? 16 : 0}
        wrapItem={false}
        class={['h-full', styles['pro-table'], attrs.class]}
        style={attrs.style}
      >
        {props.search ? (
          typeof props.search === 'function' ? (
            props.search({ onSearch: handleSearch })
          ) : (
            <NCard bordered={false} class="flex-shrink-0">
              <Search
                ref={searchRef}
                columns={searchColumns.value}
                labelWidth={typeof props.search === 'object' ? props.search.labelWidth : undefined}
                action={typeof props.search === 'object' ? props.search.action : undefined}
                onSearch={handleSearch}
              />
            </NCard>
          )
        ) : undefined}
        <NCard
          bordered={false}
          class="flex-grow h-0"
          contentStyle={{
            display: 'flex',
            flexDirection: 'column',
            height: 0,
            paddingTop: props.segmented ? '20px' : '10px'
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

export default ProTable as typeof ProTable & ProTableExpose & DefineComponent<TableAttrs>
