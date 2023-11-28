import React, { FC, memo, useState } from 'react'
import Image from 'next/image'
import { IShopCart } from '@/types'
import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons'
import { useCartItemActions } from '@/hooks/cart'

type Props = {
  data: IShopCart
}

const CartItem: FC<Props> = ({ data }) => {
  const { id, product, amount } = data
  const { countValue, handleDecreaseCount, handleIncreaseCount, handleDelete } = useCartItemActions(id, amount)

  return (
    <div className="flex items-center justify-between h-[120px] px-[30px] rounded-[18px] border border-[#E2E2E2] shadow-secondary">
      <div className="flex items-center w-[40%] gap-12">
        <Image src={product.image} alt={product.name} width={77} height={77} className="rounded-xl shadow-image" />
        <div>
          <p className="font-medium line-clamp-2">{product.name}</p>
          <p className="text-sm text-[#7C7C7C]">{product.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-2.5">
        <button onClick={handleDecreaseCount} className="flex items-center justify-center w-10 h-10">
          <MinusIcon />
        </button>
        <h6 className="w-10 h-10 rounded-xl border border-[#E2E2E2] flex items-center justify-center">{countValue}</h6>
        <button onClick={handleIncreaseCount} className="flex items-center justify-center w-10 h-10">
          <PlusIcon />
        </button>
      </div>
      <div>
        {product.discount ? (
          <>
            <p className="line-through text-[#808080]">{product.cost.toLocaleString('ru')} uzs</p>
            <h4 className="font-bold text-green-primary">{product.discount.toLocaleString('ru')} uzs</h4>
          </>
        ) : (
          <h4 className="font-bold text-green-primary">{product.cost.toLocaleString('ru')} uzs</h4>
        )}
      </div>
      <button onClick={handleDelete}>
        <DeleteIcon />
      </button>
    </div>
  )
}
export default CartItem
