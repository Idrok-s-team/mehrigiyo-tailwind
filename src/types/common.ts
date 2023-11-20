export type GetResponseType<T> = NavigationTypes & {
  results: T
}

type NavigationTypes = {
  count: number
  next: number | null
  previous: number | null
}

export type LocalizedType<T extends string> = {
  [K in `${T}` | `${T}_uz` | `${T}_ru` | `${T}_en`]: string
}

export type ElementSizeType = 'sm' | 'md' | 'lg'

export type Nullable<T> = {
  [K in keyof T]: T[K] | null
}

export type QueryParamsType = {
  [key: string]: string | number | boolean | string[] | number[]
}
