import { baseUrl } from '@/constants'
import { GetResponseType, IShopMedicines, IShopTypes, QueryParamsType } from '@/types'
import { queryStringUrl } from '@/utils'

export const getShopTypes = async (params?: QueryParamsType): Promise<GetResponseType<IShopTypes[]>> => {
  const url = queryStringUrl(`${baseUrl}/shop/types/`, params)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const getShopMedicines = async (params?: QueryParamsType): Promise<GetResponseType<IShopMedicines[]>> => {
  const url = queryStringUrl(`${baseUrl}/shop/medicines/`, params)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}
