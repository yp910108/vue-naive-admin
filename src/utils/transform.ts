export type OptionWithKey<K> = { value: K; label: string }

export function transformObjectToOption<T extends object>(obj: T) {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  })) as OptionWithKey<keyof T>[]
}
