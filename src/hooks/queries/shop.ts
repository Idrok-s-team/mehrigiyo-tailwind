import {
  GetResponseWithStatusType,
  GetResponseType,
  IShopCart,
  IShopMedicines,
  IShopTypes,
  IShopCheckout,
} from '@/types'
import { getShopCartApi, getShopCheckoutApi, getShopMedicinesApi, getShopTypesApi } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useShopTypesQuery = (props?: QueryProps<GetResponseType<IShopTypes[]>>) =>
  useGetQuery('shop-types', getShopTypesApi, [], props)

export const useShopMedicinesQuery = (props?: QueryProps<GetResponseType<IShopMedicines[]>>) =>
  useGetQuery('shop-medicines', getShopMedicinesApi, [], props)

export const useShopCartQuery = (props?: QueryProps<GetResponseWithStatusType<IShopCart[]>>) =>
  useGetQuery('shop-cart', getShopCartApi, [], props)

export const useShopCheckoutQuery = (props?: QueryProps<GetResponseWithStatusType<IShopCheckout>>) =>
  useGetQuery('shop-checkout', getShopCheckoutApi, [], props)
