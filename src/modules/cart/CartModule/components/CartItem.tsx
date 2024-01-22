import React, { FC, memo } from 'react'
import Image from 'next/image'
import { IShopCart } from '@/types'
import { DeleteIcon } from '@/assets/icons'
import { useCartItemActions } from '@/hooks/cart'
import { ProductCount } from '@/components/specific'
import { useScreenSize } from '@/hooks/common'

type Props = {
  data: IShopCart
}

const CartItem: FC<Props> = ({ data }) => {
  const { id, product, amount } = data
  const { handleDelete } = useCartItemActions(id, amount)
  const { isMinMd } = useScreenSize()

  return isMinMd ? (
    <div className="flex items-center justify-between md:h-[120px] px-[30px] rounded-[18px] border border-[#E2E2E2] shadow-secondary max-md:flex-wrap">
      <div className="flex items-center w-[40%] gap-12 max-md:w-[90%]">
        <div className="flex flex-col flex-shrink-0 items-center">
          <Image src={product.image} alt={product.name} width={77} height={77} className="rounded-xl shadow-image" />
          <div className="mt-2 md:hidden">
            <ProductCount productId={id} quantity={product.quantity} />
          </div>
        </div>
        <div>
          <div className="w-full">
            <p className="font-medium line-clamp-2">{product.name}asdfnmasdfasdkljf</p>
            <p className="text-sm text-[#7C7C7C]">{product.title}</p>
          </div>
          <div className="md:hidden">
            {product.discount ? (
              <>
                <p className="line-through text-[#808080]">{product.cost.toLocaleString('ru')} uzs</p>
                <h4 className="font-bold text-green-primary">{product.discount.toLocaleString('ru')} uzs</h4>
              </>
            ) : (
              <h4 className="font-bold text-green-primary">{product.cost.toLocaleString('ru')} uzs</h4>
            )}
          </div>
        </div>
      </div>
      <div className="max-md:hidden">
        <ProductCount productId={id} quantity={product.quantity} />
      </div>
      <div className="max-md:hidden">
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
  ) : (
    <div className="flex flex-col items-center justify-between md:h-[120px] px-[30px] py-5 rounded-[18px] border border-[#E2E2E2] shadow-secondary">
      <section className="flex items-center w-full gap-12 max-xs:gap-4">
        <div className="flex flex-col flex-shrink-0 items-center ">
          <Image
            src={product.image}
            alt={product.name}
            width={90}
            height={90}
            className="rounded-xl shadow-image w-[90px] h-[90px] object-cover"
          />
        </div>
        <div>
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-green-primary max-xs:text-lg">{product.discount.toLocaleString('ru')} uzs</h5>
                <p className="line-through text-[#808080]">{product.cost.toLocaleString('ru')} uzs</p>
              </div>
            ) : (
              <h5 className="font-bold text-green-primary max-xs:text-lg">{product.cost.toLocaleString('ru')} uzs</h5>
            )}
          </div>
          <div>
            <p className="font-medium line-clamp-2 max-xs:text-sm">{product.name} asd fasd fas df asdfn masdfasd kljf</p>
            <p className="text-sm text-[#7C7C7C] mt-1">{product.title}</p>
          </div>
        </div>
      </section>
      <section className="w-full flex items-center justify-between mt-2">
        <ProductCount productId={id} quantity={product.quantity} isSmallSize />
        <button onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </section>
    </div>
  )
}
export default memo(CartItem)
