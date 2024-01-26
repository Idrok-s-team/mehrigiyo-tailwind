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
import { fetchApi } from './common'

export const getChatApi = async (
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChat[]>> => {
  return fetchApi('/chat/', 'GET', { params, withAuth: true })
}

export const getChatFileApi = async (
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChatFile[]>> => {
  return fetchApi('/chat/file/', 'GET', { params, withAuth: true })
}

export const addChatFileApi = async (
  body: Pick<ChatFieldParamsType, 'size' | 'video'>,
  params: Pick<ChatFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IChatFile[]>> => {
  return fetchApi('/chat/file/', 'POST', { body, params, withAuth: true })
}

export const getChatMessages = async (
  params: Omit<QueryParamsType, 'type_ides'> & Pick<ChatFieldParamsType, 'chat_id'>,
): Promise<GetResponseType<IChatMessage[]>> => {
  return fetchApi('/chat/messages/', 'GET', { params, withAuth: true })
}

export const getChatRooms = async (
  params: Omit<QueryParamsType, 'type_ides'>,
): Promise<GetResponseType<IChatRoom[]>> => {
  return fetchApi('/chat/rooms/', 'GET', { params, withAuth: true })
}
