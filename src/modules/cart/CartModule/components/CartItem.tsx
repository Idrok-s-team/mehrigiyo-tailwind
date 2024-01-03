import React, { FC } from 'react'
import Image from 'next/image'
import { IShopCart } from '@/types'
import { DeleteIcon } from '@/assets/icons'
import { useCartItemActions } from '@/hooks/cart'
import { ProductCount } from '@/components/specific'

type Props = {
  data: IShopCart
}

const CartItem: FC<Props> = ({ data }) => {
  const { id, product, amount } = data
  const { handleDelete } = useCartItemActions(id, amount)

  return (
    <div className="flex items-center justify-between h-[120px] px-[30px] rounded-[18px] border border-[#E2E2E2] shadow-secondary">
      <div className="flex items-center w-[40%] gap-12">
        <Image src={product.image} alt={product.name} width={77} height={77} className="rounded-xl shadow-image" />
        <div>
          <p className="font-medium line-clamp-2">{product.name}</p>
          <p className="text-sm text-[#7C7C7C]">{product.title}</p>
        </div>
      </div>
      <div>
        <ProductCount productId={id} quantity={product.quantity} />
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
