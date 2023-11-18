import { QueryParamsType } from '@/types'
import { clearObject } from '.'

export const queryStringUrl = (baseUrl: string, params?: QueryParamsType): string => {
  if (!params || Object.keys(params).length === 0) {
    return baseUrl
  }

  const filteredParams = clearObject(params)

  const queryString = new URLSearchParams(filteredParams).toString()
  return `${baseUrl}${queryString ? `?${queryString}` : ''}`
}
