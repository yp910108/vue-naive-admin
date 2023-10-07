import { defineComponent, type PropType } from 'vue'
import { NButton, NDropdown, NTooltip } from 'naive-ui'
import type { TableSize } from '../../typings'
import { tableSizeOptions } from './constants'
import IconSize from './icon-size'

export default defineComponent({
  props: {
    size: {
      type: String as PropType<TableSize>,
      required: true
    },
    onUpdateSize: {
      type: Function as PropType<(size: TableSize) => void>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <NDropdown
        trigger="click"
        show-arrow
        value={props.size}
        options={tableSizeOptions}
        onSelect={props.onUpdateSize}
      >
        <NTooltip>
          {{
            default: () => $translate('proTable.action.size'),
            trigger: () => (
              <NButton text class="flex-shrink-0">
                <IconSize class="font-size-18px cursor-pointer" />
              </NButton>
            )
          }}
        </NTooltip>
      </NDropdown>
    )
  }
})
