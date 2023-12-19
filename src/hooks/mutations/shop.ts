import { IShopCart, GetResponseWithStatusType, ShopFieldParamsType, IShopCheckout } from '@/types'
import { addShopCartApi, addShopCheckoutApi, deleteShopCartApi, updateShopCartApi, updateShopCheckoutApi } from '@/api'
import { useCustomMutation } from './common'

// SHOP CART MUTATIONS
export const useAddShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'product' | 'amount'>, GetResponseWithStatusType<IShopCart>>(
    addShopCartApi,
  )

export const useUpdateShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'id' | 'amount'>, GetResponseWithStatusType<IShopCart>>(updateShopCartApi)

export const useDeleteShopCartMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'id'>, GetResponseWithStatusType<IShopCart>>(deleteShopCartApi)

// SHOP CHECKOUT MUTATIONS
export const useAddShopCheckoutMutation = () =>
  useCustomMutation<Pick<ShopFieldParamsType, 'list'>, GetResponseWithStatusType<IShopCheckout>>(addShopCheckoutApi)

export const useUpdateShopCheckoutMutation = () =>
  useCustomMutation<Partial<IShopCheckout>, GetResponseWithStatusType<IShopCheckout>>(updateShopCheckoutApi)
