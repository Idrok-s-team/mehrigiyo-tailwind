import { useMutation } from '@tanstack/react-query'
import { IApiErrorData, ResponseStatusType, UserFavoriteParamsType } from '@/types'
import { addUserFavoriteMedicinesApi, deleteUserFavoriteMedicinesApi } from '@/api'

export const useAddUserFavoriteMedicineMutation = () => {
  const mutation = useMutation<ResponseStatusType<string>, IApiErrorData, UserFavoriteParamsType>({
    mutationFn: (params: UserFavoriteParamsType) => {
      return addUserFavoriteMedicinesApi(params)
    },
  })
  return mutation
}

export const useDeleteUserFavoriteMedicineMutation = () => {
  const mutation = useMutation<ResponseStatusType<string>, IApiErrorData, UserFavoriteParamsType>({
    mutationFn: (params: UserFavoriteParamsType) => {
      return deleteUserFavoriteMedicinesApi(params)
    },
  })
  return mutation
}
