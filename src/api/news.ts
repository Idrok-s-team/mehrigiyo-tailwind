import { GetResponseType, INews, INewsTags, QueryParamsType } from '@/types'
import { fetchApi } from './common'

export const getNewsApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<INews[]>>('/news/', params)
}

export const getNewsTagsApi = (params?: QueryParamsType) => {
  return fetchApi<INewsTags[]>('/news/tags', params)
}

export const getNewsByIdApi = (id: number, params?: QueryParamsType) => {
  return fetchApi<INewsTags[]>(`/news/${id}/`, params)
}
