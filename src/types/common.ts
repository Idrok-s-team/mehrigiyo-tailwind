export type GetResponseType<T> = NavigationTypes & {
  results: T
}

type NavigationTypes = {
  count: number
  next: number | null
  previous: number | null
}

export type LocalizedNamesType = {
  name: string
  name_uz: string
  name_ru: string
  name_en: string
}

export type ElementSizeType = 'sm' | 'md' | 'lg'
