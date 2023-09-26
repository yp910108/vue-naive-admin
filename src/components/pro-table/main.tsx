import { computed, defineComponent, ref, type PropType } from 'vue'
import {
  NButton,
  NCard,
  NDataTable,
  NH4,
  NSpace,
  type DataTableProps,
  type PaginationProps
} from 'naive-ui'
import { transformObjectTruthy } from '@/utils'
import Search, { type ExposedMethods as SearchExposedMethods } from './search'
import type { SearchColumn, TableColumn } from './typings'
import { filterSearchColumns } from './utils'
import { IconColumnHeight, IconRefresh, IconSetting } from './icons'

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
      const { class: _class, style: _style, pagination: _pagination, ...restAttrs } = attrs
      return restAttrs
    })

    const searchRef = ref<InstanceType<typeof Search>>()

    const columns = computed(() => {
      return props.columns.map((column) => {
        const _ellipsis = column.ellipsis
        const ellipsis =
          typeof _ellipsis === 'boolean' ? _ellipsis : { tooltip: true, ..._ellipsis }
        return { ...column, ellipsis }
      })
    })

    const searchColumns = computed<SearchColumn[]>(() => filterSearchColumns(props.columns))

    const params = ref<any>({})

    const loading = ref(false)

    const mergePagination = () => {
      const _pagination = (attrs as DataTableProps).pagination
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
            <NH4 class="m-0">查询表格</NH4>
            <NSpace class="items-center" wrapItem={false}>
              <NButton type="primary">新 建</NButton>
              <IconRefresh class="font-size-18px cursor-pointer" />
              <IconColumnHeight class="font-size-18px cursor-pointer" />
              <IconSetting class="font-size-18px cursor-pointer" />
            </NSpace>
          </NSpace>
          {/* @ts-ignore */}
          <NDataTable
            flexHeight
            remote
            loading={loading.value}
            // @ts-ignore
            rowKey={(row) => row.id}
            columns={columns.value}
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

export default ProTable as typeof ProTable & ProTableExpose & typeof NDataTable
