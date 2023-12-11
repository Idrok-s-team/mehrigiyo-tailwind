'use client'

import { type FC } from 'react'
import { MinusIcon, PlusIcon } from '@/assets/icons'
import { useCartItemActions } from '@/hooks/cart'
import { Tooltip } from '..'

type Props = {
  productId: number
  quantity: number
}

const ProductCard: FC<Props> = ({ productId, quantity }) => {
  const { countValue, decreaseCount, increaseCount } = useCartItemActions(productId)

  const isLastItem = quantity === 1

  return (
    <div className="flex items-center gap-2.5">
      <button onClick={decreaseCount} className="flex items-center justify-center w-10 h-10">
        <MinusIcon />
      </button>
      <h6 className="w-10 h-10 rounded-xl border border-[#E2E2E2] flex items-center justify-center">{countValue}</h6>
      {/* {isLastItem ? (
        <Tooltip text="Sotuvda faqat 1 dona bor">
          <button
            onClick={increaseCount}
            disabled={!isLastItem}
            className={`flex items-center justify-center w-10 h-10 ${
              !isLastItem ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            <PlusIcon />
          </button>
        </Tooltip>
      ) : ( */}
      <button
        onClick={increaseCount}
        //  disabled={!isLastItem}
        className="flex items-center justify-center w-10 h-10"
      >
        <PlusIcon />
      </button>
      {/* )} */}
    </div>
  )
}

export default ProductCard
