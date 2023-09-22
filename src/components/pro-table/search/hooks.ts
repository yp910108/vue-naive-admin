import { ref, type Ref, watchEffect } from 'vue'
import type { SearchColumn } from '../typings'

export function useForm(columns: Ref<SearchColumn[]>) {
  const form = ref<any>({})

  const setForm = () => {
    for (const { key, searchDefaultValue } of columns.value) {
      form.value[key] = searchDefaultValue
    }
  }

  watchEffect(setForm)

  return { form }
}
