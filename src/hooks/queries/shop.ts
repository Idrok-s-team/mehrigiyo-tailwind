import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { GetResponseType, IShopMedicines, IShopTypes, QueryParamsType } from '@/types'
import { getShopMedicines, getShopTypes } from '@/api'

type Props<T> = {
  params?: QueryParamsType
  options?: Omit<UseQueryOptions<T>, 'queryKey'>
}

function useShopQuery<T>(key: string, queryFn: (params?: QueryParamsType) => Promise<T>, props?: Props<T>) {
  const { params, options = {} } = props ?? {}
  return useQuery<T>({
    queryKey: [key, params],
    queryFn: () => queryFn(params),
    ...options,
  })
}

export const useShopTypesQuery = (props?: Props<GetResponseType<IShopTypes[]>>) =>
  useShopQuery('shop-types', getShopTypes, props)

export const useShopMedicinesQuery = (props?: Props<GetResponseType<IShopMedicines[]>>) =>
  useShopQuery('shop-medicines', getShopMedicines, props)
