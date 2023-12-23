import {
  GetResponseWithStatusType,
  GetResponseType,
  IShopCart,
  IShopMedicines,
  IShopTypes,
  QueryParamsType,
  ShopFieldParamsType,
  IShopCheckout,
} from '@/types'
import { authorizedFetchApi, fetchApi } from './common'

export const getShopTypesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopTypes[]>>('/shop/types/', params)
}

export const getShopMedicinesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopMedicines[]>>('/shop/medicines/', params)
}

export const getShopMedicineByIdApi = (id: number, params?: QueryParamsType) => {
  return fetchApi<IShopMedicines>(`/shop/medicines/${id}/`, params)
}

// SHOP CART API
export const getShopCartApi = async (): Promise<GetResponseWithStatusType<IShopCart[]>> => {
  return authorizedFetchApi('/shop/cart/')
}

export const addShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'product' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'POST', { body })
}

export const updateShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'id' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'PUT', { body })
}

export const deleteShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'id'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedFetchApi('/shop/cart/', 'DELETE', { body })
}

// SHOP CHECKOUT API
export const getShopCheckoutApi = async (): Promise<GetResponseWithStatusType<IShopCheckout[]>> => {
  return authorizedFetchApi('/shop/checkout/')
}

export const addShopCheckoutApi = async (
  body: Pick<ShopFieldParamsType, 'list'>,
): Promise<GetResponseWithStatusType<IShopCheckout>> => {
  return authorizedFetchApi('/shop/checkout/', 'POST', { body })
}

export const updateShopCheckoutApi = async (
  body: Partial<IShopCheckout>,
): Promise<GetResponseWithStatusType<IShopCheckout>> => {
  return authorizedFetchApi('/shop/checkout/', 'PUT', { body })
}
