'use client'

import React, { useMemo } from 'react'
import { useShopCartQuery } from '@/hooks/queries'
import { CartItem, CartSummaryCard, CheckoutActionModal } from './components'
import { useCartTotalsCalculator } from '@/hooks/cart'
import { EmptyBox, Loader } from '@/components/common'

const CartModule = () => {
  const { data, isLoading } = useShopCartQuery()
  const cartData = useMemo(() => data?.data.sort((a, b) => a.id - b.id) ?? [], [data])

  const { totalCost, totalAmount, totalDiscount, deliveryPrice, finalPrice } = useCartTotalsCalculator(cartData)

  const infoCard = useMemo(
    () => [
      { label: `Mahsulotlar (${totalAmount})`, value: totalCost },
      { label: `Chegirma`, value: totalDiscount },
      { label: `Yetkazib berish`, value: deliveryPrice },
      { label: `Umumiy`, value: finalPrice, isLast: true },
    ],
    [totalAmount, totalCost, totalDiscount, deliveryPrice, finalPrice],
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-w-[15vw] min-h-[50vh]">
        <Loader />
      </div>
    )
  }

  if (cartData.length === 0) {
    return (
      <EmptyBox
        title="Savatcha bo'sh"
        description="Mahsulotlarni tanlash yoki qidiruvda kerakli narsani topish uchun bosh sahifaga tashrif buyuring"
      />
    )
  }

  return (
    <div className="mt-2.5 animate-fade-in">
      <h4>Savatchada {cartData.length} ta mahsulot bor</h4>
      <div className="flex justify-between gap-9">
        <section className="flex flex-col flex-1 gap-4 mt-11">
          {cartData.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </section>
        <CartSummaryCard infoCard={infoCard} />
      </div>

      <CheckoutActionModal />
    </div>
  )
}

export default CartModule
