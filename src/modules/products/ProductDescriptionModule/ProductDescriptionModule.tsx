'use client'

import { FC, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'
import { ChevronIcon, FavoriteFillIcon, FavoriteIcon, PlusWhiteIcon, SharedIcon } from '@/assets/icons'
import { IShopMedicines } from '@/types'
import { ActionButton, Button, ProductCount, Tooltip } from '@/components'
import { useAddToCart, useChangeFavorite } from '@/hooks/cart'

type Props = {
  product: IShopMedicines
}

const ProductDescriptionModule: FC<Props> = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const { id, name, description, discount, cost, quantity } = product

  const { isProductInCart, addToBasket } = useAddToCart(id)
  const { isProductInFavorite, onChangeFavorite } = useChangeFavorite(id)
  const [__, copy] = useCopyToClipboard()

  const onCopyToClipboard = () => {
    copy(location.href).then(() => {
      toast('Buferga nusxa olindi')
    })
  }

  const formattedCost = useMemo(() => cost.toLocaleString('ru'), [cost])
  const formattedDiscount = useMemo(() => discount?.toLocaleString('ru'), [discount])

  const renderFavoriteIcon = () =>
    isProductInFavorite ? <FavoriteFillIcon width={20} /> : <FavoriteIcon color="black" width={20} />

  const renderPriceSection = () =>
    discount ? (
      <>
        <h2 className="font-bold text-green-primary">{formattedDiscount} uzs</h2>
        <p className="line-through text-lg text-[#808080] mt-2">{formattedCost} uzs</p>
      </>
    ) : (
      <h4 className="font-bold text-green-primary">{formattedCost} uzs</h4>
    )

  const renderAddToCartButton = () => {
    const button = (
      <Button aria-label="Add to cart" disabled={isProductInCart} onClick={!isProductInCart ? addToBasket : undefined}>
        <span>
          <PlusWhiteIcon />
        </span>
        <span>Savatga qo'shish</span>
      </Button>
    )

    return isProductInCart ? <Tooltip text="Savatga qo'shilgan">{button}</Tooltip> : button
  }

  return (
    <>
      <section className="flex justify-between">
        <h2>{name}</h2>
        <div className="flex gap-4">
          <ActionButton onClick={onChangeFavorite}>{renderFavoriteIcon()}</ActionButton>
          <ActionButton onClick={onCopyToClipboard}>
            <SharedIcon />
          </ActionButton>
        </div>
      </section>

      <section className="flex items-center justify-between mt-7">
        <ProductCount productId={id} quantity={quantity} />
        <div className="flex items-center gap-2">{renderPriceSection()}</div>
      </section>
      <article className="mt-4">
        {description && (
          <div
            className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-6'}`}
            dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }}
          />
        )}
        {description && (
          <button
            className="flex items-center gap-2 group mt-2"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            <span className="font-semibold group-hover:underline">
              {showFullDescription ? 'Yopish' : "Batafsil o'qish"}
            </span>
            <span className={`scale-90 ${showFullDescription ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronIcon />
            </span>
          </button>
        )}
      </article>

      <div className="flex justify-end mt-10">
        <div className="w-56">{renderAddToCartButton()}</div>
      </div>
    </>
  )
}

export default ProductDescriptionModule
