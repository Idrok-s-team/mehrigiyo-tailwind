import { IShopCart, GetResponseWithStatusType, ShopFieldParamsType } from '@/types'
import { addShopCartApi, deleteShopCartApi, updateShopCartApi } from '@/api'
import { useCustomMutation } from './common'

export const useAddShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'product' | 'amount'>, GetResponseWithStatusType<IShopCart>>(
    addShopCartApi,
  )

export const useUpdateShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'id' | 'amount'>, GetResponseWithStatusType<IShopCart>>(updateShopCartApi)

export const useDeleteShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'id'>, GetResponseWithStatusType<IShopCart>>(deleteShopCartApi)
