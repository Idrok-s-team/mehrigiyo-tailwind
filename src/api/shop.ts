import {
  GetResponseWithStatusType,
  GetResponseType,
  IShopCart,
  IShopMedicines,
  IShopTypes,
  QueryParamsType,
  ShopFieldParamsType,
  IShopCheckout,
  ShopSearchParamsType,
  IShopSearch,
} from '@/types'
import { fetchApi } from './common'

export const getShopTypesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopTypes[]>>('/shop/types/', 'GET', { params })
}

export const getShopMedicinesApi = (params?: QueryParamsType) => {
  return fetchApi<GetResponseType<IShopMedicines[]>>('/shop/medicines/', 'GET', { params })
}

export const getShopMedicineByIdApi = (id: number, params?: QueryParamsType) => {
  return fetchApi<IShopMedicines>(`/shop/medicines/${id}/`, 'GET', { params })
}

export const getShopSearchApi = (params?: ShopSearchParamsType) => {
  return fetchApi<GetResponseWithStatusType<IShopSearch>>('/shop/search/', 'GET', { params })
}

// SHOP CART API
export const getShopCartApi = async (): Promise<GetResponseWithStatusType<IShopCart[]>> => {
  return fetchApi('/shop/cart/', 'GET', { withAuth: true })
}

export const addShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'product' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return fetchApi('/shop/cart/', 'POST', { body, withAuth: true })
}

export const updateShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'id' | 'amount'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return fetchApi('/shop/cart/', 'PUT', { body, withAuth: true })
}

export const deleteShopCartApi = async (
  body: Pick<ShopFieldParamsType, 'id'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return fetchApi('/shop/cart/', 'DELETE', { body, withAuth: true })
}

// SHOP CHECKOUT API
export const getShopCheckoutApi = async (): Promise<GetResponseWithStatusType<IShopCheckout[]>> => {
  return fetchApi('/shop/checkout/', 'GET', { withAuth: true })
}

export const addShopCheckoutApi = async (
  body: Pick<ShopFieldParamsType, 'list'>,
): Promise<GetResponseWithStatusType<IShopCheckout>> => {
  return fetchApi('/shop/checkout/', 'POST', { body, withAuth: true })
}

export const updateShopCheckoutApi = async (
  body: Partial<IShopCheckout>,
): Promise<GetResponseWithStatusType<IShopCheckout>> => {
  return fetchApi('/shop/checkout/', 'PUT', { body, withAuth: true })
}
