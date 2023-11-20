import { baseUrl } from '@/constants'
import { GetResponseType, INews, INewsTags, QueryParamsType } from '@/types'
import { queryStringUrl } from '@/utils'

export const getNews = async (params?: QueryParamsType): Promise<GetResponseType<INews[]>> => {
  const url = queryStringUrl(`${baseUrl}/news/`, params)
  const response = await fetch(url)
  return response.json()
}

export const getNewsTags = async (params?: QueryParamsType): Promise<INewsTags[]> => {
  const url = queryStringUrl(`${baseUrl}/news/tags/`, params)
  const response = await fetch(url)
  return response.json()
}
