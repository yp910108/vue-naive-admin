import { defineComponent, type PropType } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import { $translate } from '@/locales'
import { IconRefresh } from './icons'

export default defineComponent({
  props: {
    onRefresh: {
      type: Function as PropType<() => void>,
      required: true
    }
  },
  setup(props) {
    return () => (
      <NTooltip>
        {{
          default: () => $translate('proTable.action.refresh'),
          trigger: () => (
            <NButton text class="flex-shrink-0" onClick={props.onRefresh}>
              <IconRefresh class="font-size-18px cursor-pointer" />
            </NButton>
          )
        }}
      </NTooltip>
    )
  }
})
