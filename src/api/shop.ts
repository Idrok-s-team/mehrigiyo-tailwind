import { baseUrl } from '@/constants'
import {
  GetResponseWithStatusType,
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

export const getShopMedicineByIdApi = async (id: number): Promise<IShopMedicines> => {
  const url = queryStringUrl(`${baseUrl}/shop/medicines/${id}`)
  const response = await fetch(url)
  return response.json()
}

// SHOP CART API
export const getShopCartApi = async (): Promise<GetResponseWithStatusType<IShopCart[]>> => {
  return authorizedApiFetch('/shop/cart/')
}

export const addShopCartApi = async (params: ShopCartParamsType<'product'>): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedApiFetch('/shop/cart/', 'POST', params)
}

export const updateShopCartApi = async (params: ShopCartParamsType<'id'>): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedApiFetch('/shop/cart/', 'PUT', params)
}

export const deleteShopCartApi = async (
  params: ShopCartParamsType<'onlyId'>,
): Promise<GetResponseWithStatusType<IShopCart>> => {
  return authorizedApiFetch('/shop/cart/', 'DELETE', params)
}
