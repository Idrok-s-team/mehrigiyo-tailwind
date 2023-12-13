import {
  GetResponseWithStatusType,
  GetResponseType,
  IShopCart,
  IShopMedicines,
  IShopTypes,
  QueryParamsType,
  ShopFieldParamsType,
} from '@/types'
import { authorizedFetchApi, fetchApi } from './common'

export const getShopTypesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopTypes[]>>('/shop/types/', params)
}

export const getShopMedicinesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopMedicines[]>>('/shop/medicines/', params)
}

export const getShopMedicineByIdApi = (id: number, params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopMedicines[]>>(`/shop/medicines/${id}/`, params)
}

// SHOP CART API
export const getShopCartApi = async (): Promise<GetResponseWithStatusType<IShopCart[]>> => {
  return authorizedFetchApi('/shop/cart/')
}

export const addShopCartApi = async (
  params: Pick<ShopFieldParamsType, 'product' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'POST', params)
}

export const updateShopCartApi = async (
  params: Pick<ShopFieldParamsType, 'id' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'PUT', params)
}

export const deleteShopCartApi = async (
  params: Pick<ShopFieldParamsType, 'id'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'DELETE', params)
}
