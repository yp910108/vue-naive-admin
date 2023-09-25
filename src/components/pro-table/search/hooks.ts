import { ref, type Ref, watchEffect } from 'vue'
import type { DataTableColumnKey } from 'naive-ui'
import type { SearchColumn } from '../typings'

export function useForm(columns: Ref<SearchColumn[]>) {
  const form = ref<any>({})

  const setDefaultForm = () => {
    for (const { key, searchDefaultValue } of columns.value) {
      form.value[key] = searchDefaultValue
    }
  }

  const setForm = (key: DataTableColumnKey, value: any) => {
    form.value[key] = value
  }

  watchEffect(setDefaultForm)

  return { form, setForm }
}
