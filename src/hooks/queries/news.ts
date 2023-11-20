import { GetResponseType, INews, INewsTags } from '@/types'
import { getNews, getNewsTags } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useNewsQuery = (props?: QueryProps<GetResponseType<INews[]>>) => useGetQuery('news', getNews, props)

export const useNewsTagsQuery = (props?: QueryProps<INewsTags[]>) => useGetQuery('news-tags', getNewsTags, props)
