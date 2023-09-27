import { defineComponent, nextTick, ref, type PropType } from 'vue'
import {
  NButton,
  NCheckbox,
  NCheckboxGroup,
  NPopover,
  NScrollbar,
  NSpace,
  NText,
  NTooltip
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
              console.log(oldIndex, newIndex)
            }
          })
        })
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
            <NCheckbox>
              <NText strong depth="1">
                列展示/排序
              </NText>
            </NCheckbox>,
            <NButton type="primary" text>
              重置
            </NButton>
          ],
          default: () => (
            <NScrollbar style={{ maxHeight: '300px' }}>
              <NCheckboxGroup class="py-8px">
                <NSpace ref={sortRef} vertical size={3} wrapItem={false}>
                  {props.columns.map((column) => (
                    <NSpace
                      wrapItem={false}
                      align="center"
                      class="px-16px py-4px hover:bg-primary_1 cursor-pointer"
                    >
                      <IconDrag class="flex-shrink-0 font-size-18px" />
                      <NCheckbox value={column.key} class="flex-1 w-0">
                        {typeof column.label === 'function'
                          ? column.label(column)
                          : column.renderSettingLabel
                          ? column.renderSettingLabel(column.label)
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
