'use client'

import { memo, type FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IShopMedicines } from '@/types'
import { ArrowRightGrayIcon, FavoriteFillIcon, FavoriteIcon, PlusWhiteIcon } from '@/assets/icons'
import { useAddToCart, useChangeFavoriteProducts } from '@/hooks/cart'
import { createSlug } from '@/utils'
import { Tooltip } from '..'

type Props = {
  data: IShopMedicines
}

const ProductCard: FC<Props> = ({ data }) => {
  const { id, name, image, description, cost, discount, quantity } = data
  const slug = createSlug(name, id)

  const { isProductInCart, addToBasket } = useAddToCart(id)
  const { isProductInFavorite, onChangeFavorite } = useChangeFavoriteProducts(id)

  const renderPriceSection = () => {
    return discount ? (
      <>
        <p className="line-through text-[#808080]">{cost.toLocaleString('ru')} uzs</p>
        <h4 className="font-bold text-green-primary">{discount.toLocaleString('ru')} uzs</h4>
      </>
    ) : (
      <h4 className="font-bold text-green-primary">{cost.toLocaleString('ru')} uzs</h4>
    )
  }

  const renderAddToCartButton = () => {
    const button = (
      <button
        aria-label="Add to cart"
        className={`flex items-center justify-center bg-green-primary w-11 h-11 rounded-2xl ${
          isProductInCart ? 'cursor-not-allowed opacity-50' : ''
        }`}
        onClick={!isProductInCart ? addToBasket : undefined}
        disabled={isProductInCart}
      >
        <PlusWhiteIcon />
      </button>
    )

    return isProductInCart ? <Tooltip text="Savatga qo'shilgan">{button}</Tooltip> : button
  }

  return (
    <article
      key={id}
      className="w-[240px] h-[378px] bg-white border border-[#E2E2E2] shadow-secondary rounded-[18px] p-3.5"
    >
      <header className="flex items-start justify-between">
        <Link href={`/products/${slug}`}>
          <Image src={image} alt={name} width={175} height={175} loading="lazy" />
        </Link>
        <button aria-label="Add to favorites" className="cursor-pointer" onClick={onChangeFavorite}>
          {isProductInFavorite ? <FavoriteFillIcon /> : <FavoriteIcon />}
        </button>
      </header>

      <section className="mt-3 h-[60px]">
        <Link href={`/products/${slug}`} className="font-semibold line-clamp-1 hover:underline">
          {name}
        </Link>
        <p className="line-clamp-1 mt-1 text-sm text-[#7c7c7c]">{description}</p>
      </section>

      <section className="flex items-center justify-between mt-2">
        <div>{renderPriceSection()}</div>
        <div>{renderAddToCartButton()}</div>
      </section>

      <Link href={`/products/${slug}`} className="flex items-center justify-center text-[#BDBDBD] mt-3 cursor-pointer">
        <span>Tafsilotlar</span>
        <span>
          <ArrowRightGrayIcon />
        </span>
      </Link>
    </article>
  )
}

export default ProductCard
