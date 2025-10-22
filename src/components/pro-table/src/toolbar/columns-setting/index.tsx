import { changeColor } from 'seemly'
import { defineComponent, computed, nextTick, ref, type PropType } from 'vue'
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NFlex,
  NPopover,
  NScrollbar,
  NText,
  NTooltip,
  useThemeVars,
  type DataTableColumnKey
} from 'naive-ui'
import Sortable from 'sortablejs'
import type { SettingColumn } from '../../typings'
import { IconDrag, IconPinTop, IconPinBottom, IconUnpin, IconSetting } from './icons'
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
    onUpdateColumnsFixed: {
      type: Function as PropType<(key: DataTableColumnKey, fixed: SettingColumn['fixed']) => void>,
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
  setup: (props) => {
    const themeVars = useThemeVars()

    const sortable = ref<Sortable>()

    const sortRef = ref<InstanceType<typeof NFlex>>()

    const handleUpdateShow = (newVal: boolean) => {
      if (newVal) {
        nextTick(() => {
          if (sortable.value) sortable.value.destroy()
          const el = sortRef.value?.$el
          sortable.value = Sortable.create(el, {
            animation: 100,
            easing: 'linear',
            onEnd: ({ newIndex, oldIndex }) => {
              if (
                typeof newIndex === 'undefined' ||
                typeof oldIndex === 'undefined' ||
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

    const renderLeftPinIcon = (column: SettingColumn) => {
      return column.fixed === 'left' ? (
        <NTooltip contentStyle={{ padding: 0 }}>
          {{
            default: () => '取消固定',
            trigger: () => (
              <span
                class="p-4px color-[var(--icon-color)] font-size-14px hover:color-[var(--primary-color)]"
                onClick={props.onUpdateColumnsFixed.bind(null, column.key, undefined)}
              >
                <IconUnpin />
              </span>
            )
          }}
        </NTooltip>
      ) : (
        <NTooltip contentStyle={{ padding: 0 }}>
          {{
            default: () => '固定到左侧',
            trigger: () => (
              <span
                class="p-4px color-[var(--icon-color)] font-size-14px hover:color-[var(--primary-color)]"
                onClick={props.onUpdateColumnsFixed.bind(null, column.key, 'left')}
              >
                <IconPinTop />
              </span>
            )
          }}
        </NTooltip>
      )
    }

    const renderRightPinIcon = (column: SettingColumn) => {
      return column.fixed === 'right' ? (
        <NTooltip contentStyle={{ padding: 0 }}>
          {{
            default: () => '取消固定',
            trigger: () => (
              <span
                class="p-4px color-[var(--icon-color)] font-size-14px hover:color-[var(--primary-color)]"
                onClick={props.onUpdateColumnsFixed.bind(null, column.key, undefined)}
              >
                <IconUnpin />
              </span>
            )
          }}
        </NTooltip>
      ) : (
        <NTooltip contentStyle={{ padding: 0 }}>
          {{
            default: () => '固定到右侧',
            trigger: () => (
              <span
                class="p-4px color-[var(--icon-color)] font-size-14px hover:color-[var(--primary-color)]"
                onClick={props.onUpdateColumnsFixed.bind(null, column.key, 'right')}
              >
                <IconPinBottom />
              </span>
            )
          }}
        </NTooltip>
      )
    }

    return () => (
      <NPopover
        trigger="click"
        placement="bottom-end"
        class={['w-210px', styles['pro-table-columns-setting']]}
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
              class="grow-1 w-0"
              onUpdateChecked={handleUpdateCheckedAll}
            >
              <NText strong depth="1">
                列展示/排序
              </NText>
            </NCheckbox>,
            <NButton type="primary" text class="shrink-0" onClick={props.onResetColumns}>
              重置
            </NButton>
          ],
          default: () => (
            <NScrollbar style={{ maxHeight: '300px' }}>
              <NCheckboxGroup
                value={checked.value}
                class="px-12px py-8px"
                onUpdateValue={props.onUpdateColumnsVisible}
              >
                <NFlex ref={sortRef} vertical size={3}>
                  {props.columns.map((column) => (
                    <NFlex
                      key={column.key}
                      size={0}
                      align="center"
                      class="px-8px py-4px b-rd-[var(--border-radius)] hover:bg-[var(--bg-color)] cursor-pointer"
                      style={{
                        '--border-radius': themeVars.value.borderRadius,
                        '--bg-color': themeVars.value.hoverColor,
                        '--bg-active-color': changeColor(themeVars.value.primaryColor, {
                          alpha: 0.1
                        }),
                        '--icon-color': themeVars.value.iconColor
                      }}
                    >
                      <IconDrag class="shrink-0 font-size-14px color-[var(--icon-color)] cursor-grab" />
                      <NCheckbox value={column.key} class="grow-1 ml-8px w-0">
                        {typeof column.label === 'function'
                          ? column.label()
                          : column.renderLabel
                            ? column.renderLabel(column.label)
                            : column.label}
                      </NCheckbox>
                      <NFlex
                        size={0}
                        class="shrink-0"
                        style={{ '--primary-color': themeVars.value.primaryColor }}
                      >
                        {renderLeftPinIcon(column)}
                        {renderRightPinIcon(column)}
                      </NFlex>
                    </NFlex>
                  ))}
                </NFlex>
              </NCheckboxGroup>
            </NScrollbar>
          ),
          trigger: () => (
            <NTooltip>
              {{
                default: () => '列设置',
                trigger: () => (
                  <NButton text class="shrink-0">
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
