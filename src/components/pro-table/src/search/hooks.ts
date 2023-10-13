import { ref, watchEffect, type Ref } from 'vue'
import type { DataTableColumnKey } from 'naive-ui'
import type { SearchColumn } from '../typings'

export function useForm(columns: Ref<SearchColumn[]>) {
  const form = ref<Record<DataTableColumnKey, any>>({})

  const setDefaultForm = () => {
    for (const { key, defaultValue } of columns.value) {
      form.value[key] = defaultValue ?? null
    }
  }

  const getForm = (key: DataTableColumnKey) => {
    return form.value[key]
  }

  const setForm = (key: DataTableColumnKey, value: any) => {
    form.value[key] = value
  }

  watchEffect(setDefaultForm)

  return { form, getForm, setForm, resetForm: setDefaultForm }
}
