import { baseUrl } from '@/constants'
import {
  ResponseStatusType,
  GetResponseType,
  IShopCart,
  IShopMedicines,
  IShopTypes,
  QueryParamsType,
  ShopCartParamsType,
} from '@/types'
import { queryStringUrl } from '@/utils'
import { authorizedApiFetch } from '.'

export const getShopTypesApi = async (params?: QueryParamsType): Promise<GetResponseType<IShopTypes[]>> => {
  const url = queryStringUrl(`${baseUrl}/shop/types/`, params)
  const response = await fetch(url)
  return response.json()
}

export const getShopMedicinesApi = async (params?: QueryParamsType): Promise<GetResponseType<IShopMedicines[]>> => {
  const url = queryStringUrl(`${baseUrl}/shop/medicines/`, params)
  const response = await fetch(url)
  return response.json()
}

// SHOP CART API
export const getShopCartApi = async (): Promise<ResponseStatusType<IShopCart[]>> => {
  return authorizedApiFetch<void, ResponseStatusType<IShopCart[]>>('/shop/cart/')
}

export const addShopCartApi = async (params: ShopCartParamsType<'product'>): Promise<ResponseStatusType<IShopCart>> => {
  return authorizedApiFetch<ShopCartParamsType<'product'>, ResponseStatusType<IShopCart>>('/shop/cart/', 'POST', params)
}

export const updateShopCartApi = async (params: ShopCartParamsType<'id'>): Promise<ResponseStatusType<IShopCart>> => {
  return authorizedApiFetch<ShopCartParamsType<'id'>, ResponseStatusType<IShopCart>>('/shop/cart/', 'PUT', params)
}

export const deleteShopCartApi = async (
  params: ShopCartParamsType<'onlyId'>,
): Promise<ResponseStatusType<IShopCart>> => {
  return authorizedApiFetch<ShopCartParamsType<'onlyId'>, ResponseStatusType<IShopCart>>(
    '/shop/cart/',
    'DELETE',
    params,
  )
}
