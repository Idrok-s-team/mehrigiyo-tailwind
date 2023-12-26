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
import { authorizedFetchApi } from './common'

export const getChatApi = async (
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChat[]>> => {
  return authorizedFetchApi('/chat/', 'GET', { params })
}

export const getChatFileApi = async (
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChatFile[]>> => {
  return authorizedFetchApi('/chat/file/', 'GET', { params })
}

export const addChatFileApi = async (
  body: Pick<ChatFieldParamsType, 'size' | 'video'>,
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChatFile[]>> => {
  return authorizedFetchApi('/chat/file/', 'POST', { body, params })
}

export const getChatMessages = async (
  params: Omit<QueryParamsType, 'type_ides'> & Pick<ChatFieldParamsType, 'chat_id'>,
): Promise<GetResponseType<IChatMessage[]>> => {
  return authorizedFetchApi('/chat/messages/', 'GET', { params })
}

export const getChatRooms = async (
  params: Omit<QueryParamsType, 'type_ides'>,
): Promise<GetResponseType<IChatRoom[]>> => {
  return authorizedFetchApi('/chat/rooms/', 'GET', { params })
}
