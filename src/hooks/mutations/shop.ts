import { useMutation } from '@tanstack/react-query'
import { IApiErrorData, IShopCart, GetResponseWithStatusType, ShopCartParamsType } from '@/types'
import { addShopCartApi, deleteShopCartApi, updateShopCartApi } from '@/api'

export const useAddShopCartMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<IShopCart>, IApiErrorData, ShopCartParamsType<'product'>>({
    mutationFn: (params: ShopCartParamsType<'product'>) => {
      return addShopCartApi(params)
    },
  })
  return mutation
}

export const useUpdateShopCartMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<IShopCart>, IApiErrorData, ShopCartParamsType<'id'>>({
    mutationFn: (params: ShopCartParamsType<'id'>) => {
      return updateShopCartApi(params)
    },
  })
  return mutation
}

export const useDeleteShopCartMutation = () => {
  const mutation = useMutation<GetResponseWithStatusType<IShopCart>, IApiErrorData, ShopCartParamsType<'onlyId'>>({
    mutationFn: (params: ShopCartParamsType<'onlyId'>) => {
      return deleteShopCartApi(params)
    },
  })
  return mutation
}
