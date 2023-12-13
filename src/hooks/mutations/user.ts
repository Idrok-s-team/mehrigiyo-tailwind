import { GetResponseWithStatusType, UserFieldParamsType, IUserRegion } from '@/types'
import {
  addUserAddressApi,
  addUserFavoriteMedicinesApi,
  deleteUserAddressApi,
  deleteUserFavoriteMedicinesApi,
  updateUserAddressApi,
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
