import { CardFieldParamsType, GetResponseWithStatusType, ICard, ICardError } from '@/types'
import { fetchApi } from './common'

export const getCardApi = async (): Promise<GetResponseWithStatusType<ICard[]>> => {
  return fetchApi('/payme/card/', 'GET', { withAuth: true })
}

export const addCardApi = async (
  body: Pick<CardFieldParamsType, 'number' | 'expire'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return fetchApi('/payme/card/', 'POST', { body, withAuth: true })
}

export const cardConfirmCodeApi = async (
  body: Pick<CardFieldParamsType, 'card_id' | 'code'>,
): Promise<GetResponseWithStatusType<unknown>> => {
  return fetchApi('/payme/card/', 'PUT', { body, withAuth: true })
}

export const cardVerifyApi = async (
  body: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return fetchApi('/payme/card/verify/', 'POST', { body, withAuth: true })
}

export const deleteCardApi = async (
  body: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return fetchApi('/payme/card/', 'DELETE', { body, withAuth: true })
}
