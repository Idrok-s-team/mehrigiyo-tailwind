import { useMemo } from 'react'
import { IShopCart } from '@/types'
import { useAnimatedCounter } from '.'

const useCartTotalsCalculator = (cartItems?: IShopCart[]) => {
  const computedTotalCost = useMemo(() => {
    return cartItems?.reduce((total, item) => item.product.cost * item.amount + total, 0) ?? 0
  }, [cartItems])

  const computedTotalDiscount = useMemo(() => {
    return (
      cartItems?.reduce((total, item) => (item.product.discount || item.product.cost) * item.amount + total, 0) ?? 0
    )
  }, [cartItems])

  const computedItemCount = useMemo(() => {
    return cartItems?.reduce((total, item) => item.amount + total, 0) ?? 0
  }, [cartItems])

  const fixedDeliveryPrice = 15000
  const computedFinalPrice = useMemo(() => computedTotalDiscount + fixedDeliveryPrice, [computedTotalDiscount])

  const animatedTotalCost = useAnimatedCounter(computedTotalCost)
  const animatedTotalDiscount = useAnimatedCounter(computedTotalDiscount)
  const animatedFinalPrice = useAnimatedCounter(computedFinalPrice)

  return {
    totalAmount: computedItemCount,
    totalCost: animatedTotalCost,
    totalDiscount: animatedTotalDiscount,
    deliveryPrice: fixedDeliveryPrice,
    finalPrice: animatedFinalPrice,
  }
}

export default useCartTotalsCalculator
