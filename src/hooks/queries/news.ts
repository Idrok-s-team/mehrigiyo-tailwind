import { GetResponseType, INews, INewsTags } from '@/types'
import { getNewsApi, getNewsTagsApi } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useNewsQuery = (props?: QueryProps<GetResponseType<INews[]>>) => useGetQuery('news', getNewsApi, props)

export const useNewsTagsQuery = (props?: QueryProps<INewsTags[]>) => useGetQuery('news-tags', getNewsTagsApi, props)
