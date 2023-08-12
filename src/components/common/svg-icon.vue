<script lang="ts">
import { defineComponent, h } from 'vue'
import { renderIcon } from '@/utils'
import type { IconConfig } from '@/utils'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    icon: String as PropType<IconConfig['icon']>,
    fontSize: Number as PropType<IconConfig['fontSize']>,
    color: String as PropType<IconConfig['color']>
  },
  setup(props) {
    if (!props.icon) {
      return () => h('i')
    } else {
      return renderIcon({ ...props })
    }
  }
})
</script>
