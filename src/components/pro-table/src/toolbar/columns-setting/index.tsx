import { defineComponent, type PropType } from 'vue'
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
import type { SettingColumn } from '../../typings'
import IconSetting from './icon-setting'
import IconDrag from './icon-drag'

export default defineComponent({
  props: {
    columns: {
      type: Array as PropType<SettingColumn[]>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <NPopover
        trigger="click"
        placement="bottom-end"
        class="w-200px"
        headerStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 16px'
        }}
        contentStyle={{ padding: 0 }}
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
                <NSpace vertical size={3} wrapItem={false}>
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
