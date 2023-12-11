export type GetResponseType<T> = NavigationTypes & {
  results: T
}

export type GetResponseWithStatusType<T> = {
  data: T
  request: string
  status: string
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

export type QueryParamsType = Partial<{
  limit: number
  type_ides: string
  offset: number
}>

export type SortCriteriaType = 'price_high_to_low' | 'price_low_to_high' | 'newest' | 'oldest' | ''

export interface IApiErrorData {
  detail: string
}

export interface IErrorResponse {
  data: {
    detail: string
    code: string
    messages: Array<{
      token_class: string
      token_type: string
      message: string
    }>
    statusCode: number
  }
  name: string
}
