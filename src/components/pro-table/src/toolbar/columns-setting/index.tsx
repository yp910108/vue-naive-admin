import { defineComponent, computed, nextTick, ref, type PropType } from 'vue'
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NPopover,
  NScrollbar,
  NSpace,
  NText,
  NTooltip,
  type DataTableColumnKey
} from 'naive-ui'
import Sortable from 'sortablejs'
import type { SettingColumn } from '../../typings'
import IconSetting from './icon-setting'
import IconDrag from './icon-drag'
import styles from './index.module.scss'

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<SettingColumn[]>,
      required: true
    },
    onUpdateColumnsVisible: {
      type: Function as PropType<(keys: DataTableColumnKey[]) => void>,
      required: true
    },
    onUpdateColumnsOrder: {
      type: Function as PropType<(newOrder: number, oldOrder: number) => void>,
      required: true
    },
    onResetColumns: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    const sortable = ref<Sortable>()
    const sortRef = ref<InstanceType<typeof NSpace>>()

    const handleUpdateShow = (newVal: boolean) => {
      if (newVal) {
        nextTick(() => {
          if (sortable.value) sortable.value.destroy()
          const el = sortRef.value?.$el
          sortable.value = Sortable.create(el, {
            animation: 200,
            easing: 'linear',
            onEnd: ({ oldIndex, newIndex }) => {
              if (
                typeof oldIndex === 'undefined' ||
                typeof newIndex === 'undefined' ||
                newIndex === oldIndex
              )
                return
              const newOrder = props.columns[newIndex].order
              const oldOrder = props.columns[oldIndex].order
              props.onUpdateColumnsOrder(newOrder!, oldOrder!)
            }
          })
        })
      }
    }

    const checked = computed(() => {
      const visibleColumns = props.columns.filter(({ visible }) => visible)
      return visibleColumns.map(({ key }) => key)
    })

    const checkedAll = computed(() => checked.value.length === props.columns.length)
    const checkAllIndeterminate = computed(() => !checkedAll.value && !!checked.value.length)
    const handleUpdateCheckedAll = (checked: boolean) => {
      if (checked) {
        const keys = props.columns.map(({ key }) => key)
        props.onUpdateColumnsVisible(keys)
      } else {
        props.onUpdateColumnsVisible([])
      }
    }

    return () => (
      <NPopover
        trigger="click"
        placement="bottom-end"
        class={['w-200px', styles['pro-table-columns-setting']]}
        headerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 16px'
        }}
        contentStyle={{ padding: 0 }}
        onUpdateShow={handleUpdateShow}
      >
        {{
          header: () => [
            <NCheckbox
              checked={checkedAll.value}
              indeterminate={checkAllIndeterminate.value}
              onUpdateChecked={handleUpdateCheckedAll}
            >
              <NText strong depth="1">
                列展示/排序
              </NText>
            </NCheckbox>,
            <NButton type="primary" text onClick={props.onResetColumns}>
              重置
            </NButton>
          ],
          default: () => (
            <NScrollbar style={{ maxHeight: '300px' }}>
              <NCheckboxGroup
                value={checked.value}
                class="py-8px"
                onUpdateValue={props.onUpdateColumnsVisible}
              >
                <NSpace ref={sortRef} vertical size={3} wrapItem={false}>
                  {props.columns.map((column) => (
                    <NSpace
                      key={column.key}
                      wrapItem={false}
                      align="center"
                      class="px-16px py-4px hover:bg-primary_1 cursor-pointer"
                    >
                      <IconDrag class="flex-shrink-0 font-size-18px" />
                      <NCheckbox value={column.key} class="flex-1 w-0">
                        {typeof column.label === 'function'
                          ? column.label()
                          : column.renderLabel
                          ? column.renderLabel(column.label)
                          : column.label}
                      </NCheckbox>
                    </NSpace>
                  ))}
                </NSpace>
              </NCheckboxGroup>
            </NScrollbar>
          ),
          trigger: () => (
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
          )
        }}
      </NPopover>
    )
  }
})
