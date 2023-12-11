import { AddCardParamsType, GetResponseWithStatusType, ICard, ICardError } from '@/types'
import { authorizedApiFetch } from '.'

export const getCardApi = async (): Promise<GetResponseWithStatusType<ICard[]>> => {
  return authorizedApiFetch('/payme/card/')
}

export const addCardApi = async (params: AddCardParamsType): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedApiFetch('/payme/card/', 'POST', params)
}

export const cardConfirmCodeApi = async (params: {
  card_id: number
  code: string
}): Promise<GetResponseWithStatusType<unknown>> => {
  return authorizedApiFetch('/payme/card/', 'PUT', params)
}

export const cardVerifyApi = async (params: { card_id: number }): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedApiFetch('/payme/card/verify/', 'POST', params)
}

export const deleteCardApi = async (params: { card_id: number }): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedApiFetch('/payme/card/', 'DELETE', params)
}
