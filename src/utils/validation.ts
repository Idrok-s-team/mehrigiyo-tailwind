import { QueryParamsType } from '@/types'

export const clearObject = (object: QueryParamsType) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return value !== '' && value !== null && value !== undefined
    }),
  ) as Record<string, string>
}
