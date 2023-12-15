import { QueryProps, useGetQuery } from './common'
import {
  GetResponseType,
  GetResponseWithStatusType,
  IShopMedicines,
  IUserCountry,
  IUserDeliverAddress,
  IUserMe,
  IUserRegion,
  UserFieldParamsType,
} from '@/types'
import {
  getUserCountryApi,
  getUserDeliverAddressApi,
  getUserFavoriteMedicinesApi,
  getUserMeApi,
  getUserRegionApi,
} from '@/api'

// USER ME QUERIES
export const useUserMeQuery = (props?: QueryProps<GetResponseType<IUserMe[]>>) =>
  useGetQuery('user-me', getUserMeApi, [], props)

// USER FAVORITE MEDICINES QUERIES
export const useUserFavoriteMedicinesQuery = (props?: QueryProps<GetResponseType<IShopMedicines[]>>) =>
  useGetQuery('user-favorite-medicines', getUserFavoriteMedicinesApi, [], props)

// USER DELIVER ADDRESS QUERIES
export const useUserDeliveryAddressQuery = (props?: QueryProps<GetResponseType<IUserDeliverAddress[]>>) =>
  useGetQuery('user-deliver-address', getUserDeliverAddressApi, [], props)

// USER OTHER QUERIES
export const useUserCountryQuery = (props?: QueryProps<GetResponseWithStatusType<IUserCountry[]>>) =>
  useGetQuery<GetResponseWithStatusType<IUserCountry[]>>('user-country', getUserCountryApi, [], props)

export const useUserRegionQuery = (
  params: Pick<UserFieldParamsType, 'pk'>,
  props?: QueryProps<GetResponseWithStatusType<IUserDeliverAddress[]>>,
) => useGetQuery<GetResponseWithStatusType<IUserDeliverAddress[]>>('user-region', getUserRegionApi, [params], props)
