import { baseUrl } from '@/constants'
import { GetResponseType, IShopTypes } from '@/types'

export const getShopTypes = async (): Promise<GetResponseType<IShopTypes[]>> => {
  const res = await fetch(`${baseUrl}/shop/types/`)
  return res.json()
}
