interface DataType {
  number: number
  string: string
  boolean: boolean
  null: null
  undefined: undefined
  symbol: symbol
  bigInt: bigint
  object: Record<string, any>
  array: any[]
  function: (...args: any[]) => any | void
  date: Date
  regExp: RegExp
  promise: Promise<any>
  set: Set<any>
  map: Map<any, any>
  file: File
}

type DataTypeStringKey = keyof DataType

type DataTypeString<T extends DataTypeStringKey = DataTypeStringKey> = `[object ${Capitalize<T>}]`

const dataTypeLabels: {
  [K in DataTypeStringKey]: DataTypeString<K>
} = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]'
}

function getDataTypeString<K extends DataTypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as DataTypeString<K>
}

export function isNumber<T extends number>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.number
}

export function isString<T extends string>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.string
}

export function isBoolean<T extends boolean>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.boolean
}

export function isNull<T extends null>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.null
}

export function isUndefined<T extends undefined>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.undefined
}

export function isSymbol<T extends symbol>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.symbol
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt
}

export function isObject<T extends Record<string, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.object
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array
}

export function isFunction<T extends (...args: any[]) => any | void>(
  value: T | unknown
): value is T {
  return getDataTypeString(value) === dataTypeLabels.function
}

export function isDate<T extends Date>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.date
}

export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.regExp
}

export function isPromise<T extends Promise<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise
}

export function isSet<T extends Set<any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.set
}

export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.map
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file
}
