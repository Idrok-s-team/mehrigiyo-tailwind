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
} from '@/types'
import { fetchApi } from './common'
import { IDoctor } from '@/types/doctor'
import { baseApiUrl } from '@/constants'

// USER ME API
export const getUserMeApi = async () => {
  const result = await fetchApi<Promise<GetResponseType<IUserMe[]>>>('/user/me/', 'GET', { withAuth: true })
  return result.results[0]
}

export const userRegistrationApi = async (body: FormData): Promise<GetResponseWithStatusType<string>> => {
  const res = await fetch(`${baseApiUrl}/user/registration/`, { method: 'POST', body })
  return res.json()
}

// USER SMS API
export const userSendSmsApi = async (
  body: Pick<UserFieldParamsType, 'link'>,
): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/user/send/sms/', 'POST', { body, withAuth: true })
}

// USER FAVORITE MEDICINES API
export const getUserFavoriteMedicinesApi = async (): Promise<GetResponseType<IShopMedicines[]>> => {
  return fetchApi('/user/favorite/medicines/', 'GET', { withAuth: true })
}

export const addUserFavoriteMedicinesApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/user/favorite/medicines/', 'POST', { body, withAuth: true })
}

export const deleteUserFavoriteMedicinesApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/user/favorite/medicines/', 'DELETE', { body, withAuth: true })
}

// USER FAVORITE DOCTORS API
export const getUserFavoriteDoctorsApi = async (): Promise<GetResponseType<IDoctor[]>> => {
  return fetchApi('/user/favorite/doctors/', 'GET', { withAuth: true })
}

export const addUserFavoriteDoctorsApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/user/favorite/doctors/', 'POST', { body, withAuth: true })
}

export const deleteUserFavoriteDoctorsApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<string>> => {
  return fetchApi('/user/favorite/doctors/', 'DELETE', { body, withAuth: true })
}

// USER ADDRESS API
export const addUserAddressApi = async (body: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return fetchApi('/user/add/address/', 'POST', { body, withAuth: true })
}

export const updateUserAddressApi = async (body: Pick<UserFieldParamsType, 'region_id'>): Promise<IUserRegion> => {
  return fetchApi('/user/add/address/', 'PUT', { body, withAuth: true })
}

export const deleteUserAddressApi = async (body: Pick<UserFieldParamsType, 'pk'>): Promise<IUserRegion> => {
  return fetchApi('/user/add/address/', 'DELETE', { body, withAuth: true })
}

// USER CHANGE PASSWORD API
export const userChangePasswordApi = async (
  body: Pick<UserFieldParamsType, 'phone' | 'new_password'>,
): Promise<IUserRegion> => {
  return fetchApi('/user/change/password/', 'POST', { body, withAuth: true })
}

// USER DELIVER ADDRESS API
export const getUserDeliverAddressApi = async (): Promise<GetResponseType<IUserDeliverAddress[]>> => {
  return fetchApi('/user/deliver/address/', 'GET', { withAuth: true })
}

export const addUserDeliverAddressApi = async (
  body: IUserDeliverAddress,
): Promise<GetResponseWithStatusType<IUserDeliverAddress>> => {
  return fetchApi('/user/deliver/address/', 'POST', { body, withAuth: true })
}

export const updateUserDeliverAddressApi = async (body: IUserDeliverAddress): Promise<IUserDeliverAddress> => {
  return fetchApi('/user/deliver/address/', 'PUT', { body, withAuth: true })
}

export const deleteUserDeliverAddressApi = async (
  body: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<ICardError>> => {
  return fetchApi('/user/deliver/address/', 'DELETE', { body, withAuth: true })
}

// USER OTHER APIs
export const getUserCountryApi = async (): Promise<GetResponseWithStatusType<IUserCountry[]>> => {
  return fetchApi('/user/country/', 'GET', { withAuth: true })
}

export const getUserRegionApi = async (
  params: Pick<UserFieldParamsType, 'pk'>,
): Promise<GetResponseWithStatusType<IUserDeliverAddress[]>> => {
  return fetchApi('/user/region/', 'GET', { params, withAuth: true })
}
