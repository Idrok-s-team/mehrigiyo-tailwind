import { GetResponseWithStatusType, CardFieldParamsType } from '@/types'
import { addCardApi, cardConfirmCodeApi, cardVerifyApi, deleteCardApi } from '@/api'
import { useCustomMutation } from './common'

export const useAddCardMutation = () =>
  useCustomMutation<Pick<CardFieldParamsType, 'number' | 'expire'>, GetResponseWithStatusType<unknown>>(addCardApi)

export const useCardConfirmCodeMutation = () =>
  useCustomMutation<Pick<CardFieldParamsType, 'card_id' | 'code'>, GetResponseWithStatusType<unknown>>(
    cardConfirmCodeApi,
  )

export const useVerifyCardMutation = () =>
  useCustomMutation<Pick<CardFieldParamsType, 'card_id'>, GetResponseWithStatusType<unknown>>(cardVerifyApi)

export const useDeleteCardMutation = () =>
  useCustomMutation<Pick<CardFieldParamsType, 'card_id'>, GetResponseWithStatusType<unknown>>(deleteCardApi)
