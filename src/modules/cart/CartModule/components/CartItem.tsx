import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons'
import { IShopCart } from '@/types'
import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
  data: IShopCart
}

const CartItem: FC<Props> = ({ data }) => {
  const { product, amount } = data
  return (
    <div className="flex items-center justify-between h-[120px] px-[30px] rounded-[18px] border border-[#E2E2E2] shadow-secondary">
      <Image src={product.image} alt={product.name} width={77} height={77} className="rounded-xl shadow-image" />
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-[#7C7C7C]">{product.title}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <button>
          <MinusIcon />
        </button>
        <h6 className="w-10 h-10 rounded-xl border border-[#E2E2E2] flex items-center justify-center">{amount}</h6>
        <button>
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
      <button>
        <DeleteIcon />
      </button>
    </div>
  )
}
export default CartItem
