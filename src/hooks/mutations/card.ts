import { useMutation } from '@tanstack/react-query'
import { IApiErrorData, GetResponseWithStatusType, AddCardParamsType, ICard, ICardError } from '@/types'
import { addCardApi, cardConfirmCodeApi, cardVerifyApi, deleteCardApi } from '@/api'

export const useAddCardMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<unknown>, IApiErrorData, AddCardParamsType>({
    mutationFn: (params: AddCardParamsType) => {
      return addCardApi(params)
    },
  })
  return mutation
}

export const useCardConfirmCodeMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<unknown>, IApiErrorData, { card_id: number; code: string }>({
    mutationFn: (params: { card_id: number; code: string }) => {
      return cardConfirmCodeApi(params)
    },
  })
  return mutation
}

export const useVerifyCardMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<unknown>, IApiErrorData, { card_id: number }>({
    mutationFn: (params: { card_id: number }) => {
      return cardVerifyApi(params)
    },
  })
  return mutation
}

export const useDeleteCardMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<unknown>, IApiErrorData, { card_id: number }>({
    mutationFn: (params: { card_id: number }) => {
      return deleteCardApi(params)
    },
  })
  return mutation
}
