// Base types
type NavigationTypes = {
  count: number
  next: number | null
  previous: number | null
}

export type LocalizedType<T extends string> = Record<`${T}` | `${T}_uz` | `${T}_ru` | `${T}_en`, string>

export type ElementSizeType = 'sm' | 'md' | 'lg'

export type Nullable<T> = {
  [K in keyof T]: T[K] extends (...args: infer P) => any
    ? (...args: { [I in keyof P]: P[I] | null }) => ReturnType<T[K]>
    : T[K] | null
}
export type QueryParamsType = Partial<{
  limit: number
  type_ides: string
  offset: number
}>

export type SortCriteriaType = 'price_high_to_low' | 'price_low_to_high' | 'newest' | 'oldest' | ''

// Response types
export type GetResponseType<T> = NavigationTypes & {
  results: T
}

export type GetResponseWithStatusType<T> = {
  data: T
  request: string
  status: string
}

// Error handling types
interface ApiErrorDetail {
  detail: string
  code?: string
  messages?: Array<{
    token_class: string
    token_type: string
    message: string
  }>
  statusCode?: number
}

export interface IApiErrorData {
  detail: string
}

export interface IErrorResponse {
  data: ApiErrorDetail
  name: string
}

// UI related types
export interface ISelectOption {
  label: string
  value: string | number | readonly string[] | undefined
  selected?: boolean
}
