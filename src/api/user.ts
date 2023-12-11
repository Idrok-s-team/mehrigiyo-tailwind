import { GetResponseType, IShopMedicines, IUserMe, GetResponseWithStatusType, UserFavoriteParamsType } from '@/types'
import { authorizedApiFetch } from '.'

// USER ME API
export const getUserMeApi = async (): Promise<GetResponseType<IUserMe[]>> => {
  return authorizedApiFetch('/user/me/')
}

// FAVORITE MEDICINES API
export const getUserFavoriteMedicinesApi = async (): Promise<GetResponseType<IShopMedicines[]>> => {
  return authorizedApiFetch('/user/favorite/medicines/')
}

export const addUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedApiFetch('/user/favorite/medicines/', 'POST', params)
}

export const updateUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<UserFavoriteParamsType> => {
  return authorizedApiFetch('/user/favorite/medicines/', 'PUT', params)
}

export const deleteUserFavoriteMedicinesApi = async (
  params: UserFavoriteParamsType,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedApiFetch('/user/favorite/medicines/', 'DELETE', params)
}
