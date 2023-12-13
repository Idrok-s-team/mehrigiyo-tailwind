import { CardFieldParamsType, GetResponseWithStatusType, ICard, ICardError } from '@/types'
import { authorizedFetchApi } from './common'

export const getCardApi = async (): Promise<GetResponseWithStatusType<ICard[]>> => {
  return authorizedFetchApi('/payme/card/')
}

export const addCardApi = async (
  body: Pick<CardFieldParamsType, 'number' | 'expire'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/', 'POST', { body })
}

export const cardConfirmCodeApi = async (
  body: Pick<CardFieldParamsType, 'card_id' | 'code'>,
): Promise<GetResponseWithStatusType<unknown>> => {
  return authorizedFetchApi('/payme/card/', 'PUT', { body })
}

export const cardVerifyApi = async (
  body: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/verify/', 'POST', { body })
}

export const deleteCardApi = async (
  body: Pick<CardFieldParamsType, 'card_id'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/payme/card/', 'DELETE', { body })
}
