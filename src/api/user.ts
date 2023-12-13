import {
  GetResponseType,
  IShopMedicines,
  IUserMe,
  GetResponseWithStatusType,
  IUserRegion,
  UserFieldParamsType,
  IUserDeliveryAddress,
} from '@/types'
import { authorizedFetchApi } from './common'

// USER ME API
export const getUserMeApi = async (): Promise<GetResponseType<IUserMe[]>> => {
  return authorizedFetchApi('/user/me/')
}

// USER FAVORITE MEDICINES API
export const getUserFavoriteMedicinesApi = async (): Promise<GetResponseType<IShopMedicines[]>> => {
  return authorizedFetchApi('/user/favorite/medicines/')
}

export const addUserFavoriteMedicinesApi = async (
  params: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/medicines/', 'POST', params)
}

export const updateUserFavoriteMedicinesApi = async (
  params: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/medicines/', 'PUT', params)
}

export const deleteUserFavoriteMedicinesApi = async (
  params: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/medicines/', 'DELETE', params)
}

// USER ADDRESS API
export const addUserAddressApi = async (params: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'POST', params)
}

export const updateUserAddressApi = async (params: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'PUT', params)
}

export const deleteUserAddressApi = async (params: Pick<UserFieldParamsType, 'pk'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'DELETE', params)
}

// USER CHANGE PASSWORD API
export const userChangePasswordApi = async (
  params: Pick<UserFieldParamsType, 'phone' | 'new_password'>,
): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/change/password/', 'POST', params)
}

// USER DELIVER ADDRESS API
export const getUserDeliverAddressApi = async (): Promise<GetResponseType<IUserDeliveryAddress>> => {
  return authorizedFetchApi('/user/deliver/address/')
}

export const addUserDeliverAddressApi = async (params: IUserDeliveryAddress): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/deliver/address/', 'POST', params)
}
