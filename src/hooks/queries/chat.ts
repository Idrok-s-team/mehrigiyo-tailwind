import {
  ChatFieldParamsType,
  GetResponseType,
  GetResponseWithStatusType,
  IChat,
  IChatFile,
  IChatMessage,
  IChatRoom,
  IErrorResponse,
  QueryParamsType,
} from '@/types'
import { QueryProps, useGetQuery } from './common'
import { authorizedFetchApi, getChatApi, getChatFileApi, getChatMessages, getChatRooms } from '@/api'
import { UseInfiniteQueryOptions, UseInfiniteQueryResult, useInfiniteQuery, InfiniteData } from '@tanstack/react-query'

export const useChatQuery = (
  params: Pick<ChatFieldParamsType, 'pk'>,
  props?: QueryProps<GetResponseWithStatusType<IChat[]>>,
) => useGetQuery('chat', getChatApi, [params], props)

export const useChatFileQuery = (
  params: Pick<ChatFieldParamsType, 'pk'>,
  props?: QueryProps<GetResponseWithStatusType<IChatFile[]>>,
) => useGetQuery('chat-file', getChatFileApi, [params], props)

export const useChatMessagesQuery = (
  params: Omit<QueryParamsType, 'type_ides'> & Pick<ChatFieldParamsType, 'chat_id'>,
  props?: QueryProps<GetResponseType<IChatMessage[]>>,
) => useGetQuery('chat-messages', getChatMessages, [params], props)

export const useChatRoomsQuery = (
  params: Omit<QueryParamsType, 'type_ides'>,
  props?: QueryProps<GetResponseType<IChatRoom[]>>,
) => useGetQuery('chat-rooms', getChatRooms, [params], props)

// Infinite query
type KeyParams = {
  [key: string]: any
}

export const DEFAULT_LIMIT = 10

export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])]
}

type Response = GetResponseType<IChatMessage[]>
type InfiniteQuery = UseInfiniteQueryOptions<
  Response,
  unknown,
  IChatMessage,
  Response,
  Array<string | KeyParams>,
  number
>
type OmittedQueryKey = Omit<InfiniteQuery, 'queryKey' | 'getNextPageParam' | 'initialPageParam'>

export function useInfiniteChatMessagesQuery(chat_id: number, config: OmittedQueryKey) {
  const queryKey = getQueryKey('chat-infinite-messages')
  return useInfiniteQuery({
    ...config,
    queryKey,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      return authorizedFetchApi(`/chat/messages/?chat_id=${chat_id}&limit=10&offset=${pageParam}`)
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 20
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.results),
    }),
  })
}
