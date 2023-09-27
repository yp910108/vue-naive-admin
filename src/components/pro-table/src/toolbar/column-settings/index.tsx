import { defineComponent } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import IconSetting from './icon-setting'

export default defineComponent({
  setup() {
    return () => (
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
  }
})
