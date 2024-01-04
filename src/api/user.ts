import {
  GetResponseType,
  IShopMedicines,
  IUserMe,
  GetResponseWithStatusType,
  IUserRegion,
  UserFieldParamsType,
  IUserDeliverAddress,
  IUserCountry,
  ICardError,
  IUserRegistration,
} from '@/types'
import { authorizedFetchApi } from './common'
import { IDoctor } from '@/types/doctor'

// USER ME API
export const getUserMeApi = async () => {
  const result = await authorizedFetchApi<Promise<GetResponseType<IUserMe[]>>>('/user/me/')
  return result.results[0]
}

export const userRegistrationApi = async (body: FormData): Promise<GetResponseWithStatusType<IUserRegistration>> => {
  return authorizedFetchApi('/user/registration/', 'POST', { body, withAuth: false })
}

// USER SMS API
export const userSendSmsApi = async (
  body: Pick<UserFieldParamsType, 'link'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/send/sms/', 'POST', { body })
}

// USER FAVORITE MEDICINES API
export const getUserFavoriteMedicinesApi = async (): Promise<GetResponseType<IShopMedicines[]>> => {
  return authorizedFetchApi('/user/favorite/medicines/')
}

export const addUserFavoriteMedicinesApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/medicines/', 'POST', { body })
}

export const deleteUserFavoriteMedicinesApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/medicines/', 'DELETE', { body })
}

// USER FAVORITE DOCTORS API
export const getUserFavoriteDoctorsApi = async (): Promise<GetResponseType<IDoctor[]>> => {
  return authorizedFetchApi('/user/favorite/doctors/')
}

export const addUserFavoriteDoctorsApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/doctors/', 'POST', { body })
}

export const deleteUserFavoriteDoctorsApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return authorizedFetchApi('/user/favorite/doctors/', 'DELETE', { body })
}

// USER ADDRESS API
export const addUserAddressApi = async (body: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'POST', { body })
}

export const updateUserAddressApi = async (body: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'PUT', { body })
}

export const deleteUserAddressApi = async (body: Pick<UserFieldParamsType, 'pk'>): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/add/address/', 'DELETE', { body })
}

// USER CHANGE PASSWORD API
export const userChangePasswordApi = async (
  body: Pick<UserFieldParamsType, 'phone' | 'new_password'>,
): Promise<IUserRegion> => {
  return authorizedFetchApi('/user/change/password/', 'POST', { body })
}

// USER DELIVER ADDRESS API
export const getUserDeliverAddressApi = async (): Promise<GetResponseType<IUserDeliverAddress[]>> => {
  return authorizedFetchApi('/user/deliver/address/')
}

export const addUserDeliverAddressApi = async (
  body: IUserDeliverAddress,
): Promise<GetResponseWithStatusType<IUserDeliverAddress>> => {
  return authorizedFetchApi('/user/deliver/address/', 'POST', { body })
}

export const updateUserDeliverAddressApi = async (body: IUserDeliverAddress): Promise<IUserDeliverAddress> => {
  return authorizedFetchApi('/user/deliver/address/', 'PUT', { body })
}

export const deleteUserDeliverAddressApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return authorizedFetchApi('/user/deliver/address/', 'DELETE', { body })
}

// USER OTHER APIs
export const getUserCountryApi = async (): Promise<GetResponseWithStatusType<IUserCountry[]>> => {
  return authorizedFetchApi('/user/country/')
}

export const getUserRegionApi = async (
  params: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IUserDeliverAddress[]>> => {
  return authorizedFetchApi('/user/region/', 'GET', { params })
}
