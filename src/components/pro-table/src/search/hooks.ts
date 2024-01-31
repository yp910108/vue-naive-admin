import { effectScope, onMounted, onScopeDispose, ref, watch } from 'vue'
import type { DataTableColumnKey } from 'naive-ui'
import type { SearchColumn } from '../typings'

export function useForm(columns: SearchColumn[]) {
  const form = ref<Record<DataTableColumnKey, any>>({})

  const getForm = (key: DataTableColumnKey) => {
    return form.value[key]
  }

  const setForm = (key: DataTableColumnKey, value: any) => {
    form.value[key] = value
  }

  const initForm = () => {
    for (const { key, defaultValue } of columns) {
      setForm(key, defaultValue ?? null)
    }
  }

  const setDefaultForm = (key: DataTableColumnKey, value: any) => {
    const column = columns.find((column) => column.key === key)
    if (column) {
      column.defaultValue = value
    } else {
      columns.push({ key, defaultValue: value })
    }
    setForm(key, value)
  }

  const scope = effectScope()

  const initWatch = () => {
    for (const key of Object.keys(form.value)) {
      const column = columns.find((column) => column.key === key)
      if (column?.onChange) {
        const { onChange } = column
        if (typeof onChange === 'object') {
          const { watch: _watch, immediate, handler } = onChange
          if (_watch) {
            watch(
              () => form.value[key],
              (newVal, oldVal) => {
                if (newVal === null && oldVal === undefined) return
                if (newVal !== oldVal) {
                  handler(newVal, oldVal)
                }
              },
              { immediate }
            )
          }
        }
      }
    }
  }

  onMounted(() => {
    initForm()
    scope.run(initWatch)
  })

  onScopeDispose(scope.stop)

  return { form, getForm, setForm, setDefaultForm, resetForm: initForm }
}
