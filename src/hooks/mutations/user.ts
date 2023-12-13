import { GetResponseWithStatusType, UserFieldParamsType, IUserRegion, IUserDeliverAddress } from '@/types'
import {
  addUserAddressApi,
  addUserDeliverAddressApi,
  addUserFavoriteMedicinesApi,
  deleteUserAddressApi,
  deleteUserDeliverAddressApi,
  deleteUserFavoriteMedicinesApi,
  updateUserAddressApi,
  updateUserDeliverAddressApi,
} from '@/api'
import { useCustomMutation } from './common'

// FAVORITE MUTATIONS
export const useAddUserFavoriteMedicineMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(addUserFavoriteMedicinesApi)

export const useDeleteUserFavoriteMedicineMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(deleteUserFavoriteMedicinesApi)

// ADDRESS MUTATIONS
export const useAddUserAddressMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'region_id'>, IUserRegion>(addUserAddressApi)

export const useUpdateUserAddressMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'region_id'>, IUserRegion>(updateUserAddressApi)

export const useDeleteUserAddressMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, IUserRegion>(deleteUserAddressApi)

//DELIVER ADDRESS MUTATIONS
export const useAddUserDeliverAddressMutation = () =>
  useCustomMutation<IUserDeliverAddress, GetResponseWithStatusType<IUserDeliverAddress>>(addUserDeliverAddressApi)

export const useUpdateUserDeliverAddressMutation = () =>
  useCustomMutation<IUserDeliverAddress, IUserDeliverAddress>(updateUserDeliverAddressApi)

export const useDeleteUserDeliverAddressMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<unknown>>(deleteUserDeliverAddressApi)
