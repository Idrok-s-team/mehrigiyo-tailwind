import { GetResponseType, IShopMedicines, IShopTypes } from '@/types'
import { getShopMedicines, getShopTypes } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useShopTypesQuery = (props?: QueryProps<GetResponseType<IShopTypes[]>>) =>
  useGetQuery('shop-types', getShopTypes, props)

export const useShopMedicinesQuery = (props?: QueryProps<GetResponseType<IShopMedicines[]>>) =>
  useGetQuery('shop-medicines', getShopMedicines, props)
