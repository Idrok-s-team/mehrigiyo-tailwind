import {
  ChatFieldParamsType,
  GetResponseType,
  GetResponseWithStatusType,
  IChat,
  IChatFile,
  IChatMessage,
  IChatRoom,
  QueryParamsType,
} from '@/types'
import { QueryProps, useGetQuery } from './common'
import { getChatApi, getChatFileApi, getChatMessages, getChatRooms } from '@/api'

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
  props?: QueryProps<GetResponseWithStatusType<IChatMessage[]>>,
) => useGetQuery('chat-messages', getChatMessages, [params], props)

export const useChatRoomsQuery = (
  params: Omit<QueryParamsType, 'type_ides'>,
  props?: QueryProps<GetResponseWithStatusType<IChatRoom[]>>,
) => useGetQuery('chat-rooms', getChatRooms, [params], props)
