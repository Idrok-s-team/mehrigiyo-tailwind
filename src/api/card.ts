import { CardFieldParamsType, GetResponseWithStatusType, ICard, ICardError } from '@/types'
import { authorizedFetchApi } from './common'

export const getCardApi = async (): Promise<GetResponseWithStatusType<ICard[]>> => {
  return authorizedFetchApi('/payme/card/')
}

export const addCardApi = async (
  params: Pick<CardFieldParamsType, 'number' | 'expire'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/', 'POST', params)
}

export const cardConfirmCodeApi = async (
  params: Pick<CardFieldParamsType, 'card_id' | 'code'>,
): Promise<GetResponseWithStatusType<unknown>> => {
  return authorizedFetchApi('/payme/card/', 'PUT', params)
}

export const cardVerifyApi = async (
  params: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/verify/', 'POST', params)
}

export const deleteCardApi = async (
  params: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/', 'DELETE', params)
}
