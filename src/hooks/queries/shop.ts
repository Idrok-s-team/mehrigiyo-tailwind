import { GetResponseWithStatusType, GetResponseType, IShopCart, IShopMedicines, IShopTypes } from '@/types'
import { getShopCartApi, getShopMedicinesApi, getShopTypesApi } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useShopTypesQuery = (props?: QueryProps<GetResponseType<IShopTypes[]>>) =>
  useGetQuery('shop-types', getShopTypesApi, props)

export const useShopMedicinesQuery = (props?: QueryProps<GetResponseType<IShopMedicines[]>>) =>
  useGetQuery('shop-medicines', getShopMedicinesApi, props)

export const useShopCartQuery = (props?: QueryProps<GetResponseWithStatusType<IShopCart[]>>) =>
  useGetQuery('shop-cart', getShopCartApi, props)
