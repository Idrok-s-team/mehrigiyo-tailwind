/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useMemo } from 'react'
import { useShopCartQuery } from '@/hooks/queries'
import Image from 'next/image'
import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons'
import { Button } from '@/components'
import { CartItem, CartSummaryCard } from './components'
import { useCalculateTotals } from '@/hooks/common'

const CartModule = () => {
  const { data } = useShopCartQuery()
  const cartData = data?.data

  const { totalCost, totalAmount, totalDiscount, deliveryPrice, lastPrice } = useCalculateTotals(cartData)

  const infoCard = useMemo(
    () => [
      { label: `Mahsulotlar (${totalAmount})`, value: totalCost },
      { label: `Chegirma`, value: totalDiscount },
      { label: `Yetkazib berish`, value: deliveryPrice },
      { label: `Umumiy`, value: lastPrice, isLast: true },
    ],
    [deliveryPrice, lastPrice, totalAmount, totalCost, totalDiscount],
  )

  return (
    <div className="mt-2.5">
      <h4>Savatchada {cartData?.length || 0} ta mahsulot bor</h4>

      <div className="flex justify-between gap-9">
        <section className="flex flex-col flex-1 gap-4 mt-11">
          {cartData?.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </section>

        <section>
          <CartSummaryCard infoCard={infoCard} />
        </section>
      </div>
    </div>
  )
}

export default CartModule
