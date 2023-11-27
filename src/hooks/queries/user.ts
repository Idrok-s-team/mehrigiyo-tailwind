import { GetResponseType, IShopMedicines, IUserMe } from '@/types'
import { QueryProps, useGetQuery } from './common'
import { getUserFavoriteMedicinesApi, getUserMeApi } from '@/api'

export const useUserMeQuery = (props?: QueryProps<GetResponseType<IUserMe[]>>) =>
  useGetQuery('user-me', getUserMeApi, props)

export const useUserFavoriteMedicinesQuery = (props?: QueryProps<GetResponseType<IShopMedicines[]>>) =>
  useGetQuery('user-favorite-medicines', getUserFavoriteMedicinesApi, props)
