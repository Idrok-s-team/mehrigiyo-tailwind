'use client'

import { memo, type FC } from 'react'
import { MinusIcon, PlusIcon } from '@/assets/icons'
import { useCartItemActions } from '@/hooks/cart'
import { Tooltip } from '../../common'

type Props = {
  productId: number
  quantity: number
  isSmallSize?: boolean
}

const ProductCard: FC<Props> = ({ productId, quantity, isSmallSize }) => {
  const { countValue, decreaseCount, increaseCount } = useCartItemActions(productId)

  const isLastItem = quantity === 1
  const isNoQuantity = quantity === 0

  return (
    <div className={`flex items-center ${isSmallSize ? 'gap-0' : 'gap-2.5'}`}>
      <button
        onClick={decreaseCount}
        className={`flex items-center justify-center w-10 h-10 ${isSmallSize ? 'scale-75 w-8 h-8' : ''}`}
      >
        <MinusIcon />
      </button>
      <h6
        className={`w-10 h-10 rounded-xl border border-[#E2E2E2] flex items-center justify-center ${
          isSmallSize ? 'scale-75 w-8 h-8 border-none' : ''
        }`}
      >
        {countValue}
      </h6>
      {isLastItem || isNoQuantity ? (
        <Tooltip text={isLastItem ? 'Sotuvda faqat 1 dona bor' : isNoQuantity ? 'Sotuvda qolmagan' : ''}>
          <button
            disabled={isLastItem || isNoQuantity}
            className={`flex items-center justify-center w-10 h-10 ${
              isLastItem || isNoQuantity ? 'cursor-not-allowed opacity-50' : ''
            } ${isSmallSize ? 'scale-75  w-8 h-8' : ''}`}
          >
            <PlusIcon />
          </button>
        </Tooltip>
      ) : (
        <button
          onClick={increaseCount}
          className={`flex items-center justify-center w-10 h-10  ${isSmallSize ? 'scale-75 w-8 h-8' : ''}`}
        >
          <PlusIcon />
        </button>
      )}
    </div>
  )
}

export default memo(ProductCard)
