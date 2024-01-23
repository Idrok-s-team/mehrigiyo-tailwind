'use client'

import { FC, useEffect, useMemo, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { ChevronIcon, FavoriteFillIcon, FavoriteIcon, PlusWhiteIcon, SharedIcon } from '@/assets/icons'
import { IShopMedicines } from '@/types'
import { ActionButton, Button, Tooltip, ViewSlide } from '@/components/common'
import { useAddToCart, useChangeFavoriteProducts } from '@/hooks/cart'
import { ProductCount } from '@/components/specific'
import { cleanHtml } from '@/utils'

type Props = {
  product: IShopMedicines | null
}

const ProductDescriptionModule: FC<Props> = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const { id, name, description, discount, cost, quantity, image, pictures } = product!

  const { isProductInCart, addToBasket } = useAddToCart(id)
  const { isProductInFavorite, onChangeFavorite } = useChangeFavoriteProducts(id)
  const [__, copy] = useCopyToClipboard()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const onCopyToClipboard = () => {
    copy(location.href)
  }

  const formattedCost = useMemo(() => cost.toLocaleString('ru'), [cost])
  const formattedDiscount = useMemo(() => discount?.toLocaleString('ru'), [discount])

  const mainImage = {
    name,
    image,
  }

  const slides =
    pictures.length > 0
      ? pictures.map((item) => ({ ...mainImage, name: `${name}__${item.id}`, image: item.image }))
      : [mainImage]

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
      <div className="flex gap-10 relative max-lg:gap-5 max-md:flex-wrap">
        <section className="w-2/5 md:sticky top-32 max-lg:w-1/2 max-md:w-full md:h-[550px] max-md:h-[50vh]">
          <ViewSlide slides={slides} />
        </section>

        <div className="flex-1 max-md:mt-32">
          <section className="flex justify-between">
            <h2>{name}</h2>
            <div className="flex gap-4 items-center">
              <ActionButton onClick={onChangeFavorite}>{renderFavoriteIcon()}</ActionButton>
              <Tooltip text="Nusxa olish">
                <ActionButton onClick={onCopyToClipboard}>
                  <SharedIcon />
                </ActionButton>
              </Tooltip>
            </div>
          </section>

          <section className="flex items-center justify-between mt-7 max-lg:flex-wrap">
            <div className="order-2">
              <ProductCount productId={id} quantity={quantity} />
            </div>
            <div className="flex items-center gap-2 order-1">{renderPriceSection()}</div>
          </section>

          <article className="mt-4">
            {description && (
              <div
                className={`overflow-hidden ${showFullDescription ? '' : 'line-clamp-6'}`}
                dangerouslySetInnerHTML={{ __html: cleanHtml(description.replace(/\n/g, '<br>')) }}
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

          <section className="flex justify-end mt-10 max-md:justify-start">
            <div className="w-56">{renderAddToCartButton()}</div>
          </section>
        </div>
      </div>

      {/* <div className="mt-10">
        <Tabs
          items={[
            { key: 'description', label: 'Mahsulot tavsifi',children:<p>alksdjflkasjdklf</p> },
            { key: 'comments', label: 'Izohlar' },
          ]}
        />
      </div> */}
    </>
  )
}

export default ProductDescriptionModule
