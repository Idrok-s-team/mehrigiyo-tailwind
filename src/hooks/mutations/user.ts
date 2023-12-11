import { useMutation } from '@tanstack/react-query'
import { IApiErrorData, GetResponseWithStatusType, UserFavoriteParamsType } from '@/types'
import { addUserFavoriteMedicinesApi, deleteUserFavoriteMedicinesApi } from '@/api'

export const useAddUserFavoriteMedicineMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<string>, IApiErrorData, UserFavoriteParamsType>({
    mutationFn: (params: UserFavoriteParamsType) => {
      return addUserFavoriteMedicinesApi(params)
    },
  })
  return mutation
}

export const useDeleteUserFavoriteMedicineMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<string>, IApiErrorData, UserFavoriteParamsType>({
    mutationFn: (params: UserFavoriteParamsType) => {
      return deleteUserFavoriteMedicinesApi(params)
    },
  })
  return mutation
}
