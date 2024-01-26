import {
  GetResponseWithStatusType,
  UserFieldParamsType,
  IUserRegion,
  IUserDeliverAddress,
  IUserRegistration,
} from '@/types'
import {
  addUserAddressApi,
  addUserDeliverAddressApi,
  addUserFavoriteDoctorsApi,
  addUserFavoriteMedicinesApi,
  deleteUserAddressApi,
  deleteUserDeliverAddressApi,
  deleteUserFavoriteDoctorsApi,
  deleteUserFavoriteMedicinesApi,
  updateUserAddressApi,
  updateUserDeliverAddressApi,
  userRegistrationApi,
} from '@/api'
import { useCustomMutation } from './common'

export const useUserRegisterMutation = () =>
  useCustomMutation<FormData, GetResponseWithStatusType<string>>(userRegistrationApi)

// FAVORITE MEDICINE MUTATIONS
export const useAddUserFavoriteMedicinesMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(addUserFavoriteMedicinesApi)

export const useDeleteUserFavoriteMedicinesMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(deleteUserFavoriteMedicinesApi)

// FAVORITE DOCTORS MUTATIONS
export const useAddUserFavoriteDoctorsMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(addUserFavoriteDoctorsApi)

export const useDeleteUserFavoriteDoctorsMutation = () =>
  useCustomMutation<Pick<UserFieldParamsType, 'pk'>, GetResponseWithStatusType<string>>(deleteUserFavoriteDoctorsApi)

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
