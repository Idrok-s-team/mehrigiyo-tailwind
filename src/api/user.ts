import { GetResponseType, IShopMedicines, IUserMe, ResponseStatusType, UserFavoriteParamsType } from '@/types'
import { authorizedApiFetch } from '.'

// USER ME API
export const getUserMeApi = async (): Promise<GetResponseType<IUserMe[]>> => {
  return authorizedApiFetch<void, GetResponseType<IUserMe[]>>('/user/me/')
}

// FAVORITE MEDICINES API
export const getUserFavoriteMedicinesApi = async (): Promise<GetResponseType<IShopMedicines[]>> => {
  return authorizedApiFetch<void, GetResponseType<IShopMedicines[]>>('/user/favorite/medicines/')
}

export const addUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<ResponseStatusType<string>> => {
  return authorizedApiFetch<UserFavoriteParamsType, ResponseStatusType<string>>(
    '/user/favorite/medicines/',
    'POST',
    params,
  )
}

export const updateUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<UserFavoriteParamsType> => {
  return authorizedApiFetch<UserFavoriteParamsType, UserFavoriteParamsType>('/user/favorite/medicines/', 'PUT', params)
}

export const deleteUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<ResponseStatusType<string>> => {
  return authorizedApiFetch<UserFavoriteParamsType, ResponseStatusType<string>>(
    '/user/favorite/medicines/',
    'DELETE',
    params,
  )
}