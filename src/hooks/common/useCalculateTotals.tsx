import { IShopCart } from '@/types'
import { useMemo } from 'react'

const useCalculateTotals = (cartData?: IShopCart[]) => {
  return useMemo(() => {
    const totalAmount = cartData?.reduce((total, item) => item.amount + total, 0) ?? 0
    const totalCost = cartData?.reduce((total, item) => item.product.cost * item.amount + total, 0) ?? 0
    const totalDiscount =
      cartData?.reduce((total, item) => (item.product.discount || item.product.cost) * item.amount + total, 0) ?? 0

    const deliveryPrice = 15000
    const lastPrice = totalDiscount + deliveryPrice

    return { totalAmount, totalCost, totalDiscount, deliveryPrice, lastPrice }
  }, [cartData])
}

export default useCalculateTotals
