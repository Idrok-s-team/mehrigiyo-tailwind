'use client'

import { memo, type FC, useCallback } from 'react'
import Image from 'next/image'
import { IShopMedicines } from '@/types'
import { ArrowRightGrayIcon, FavoriteFillIcon, FavoriteIcon, PlusWhiteIcon } from '@/assets/icons'
import { useAddToCart, useChangeFavorite } from '@/hooks/cart'

type Props = {
  product: IShopMedicines
  setIsDetailsOpen: (isOpen: boolean) => void
  setSelectedProduct: (product: IShopMedicines) => void
}

const ProductCard: FC<Props> = memo(function ProductCard({ product, setIsDetailsOpen, setSelectedProduct }) {
  const { id, name, image, description, cost, discount } = product

  const { isProductInCart, addToBasket } = useAddToCart(id)
  const { isProductInFavorite, onChangeFavorite } = useChangeFavorite(id)

  const handleDetailsOpen = useCallback(() => {
    setIsDetailsOpen(true)
    setSelectedProduct(product)
  }, [product, setIsDetailsOpen, setSelectedProduct])

  return (
    <article
      key={id}
      className="w-[240px] h-[378px] bg-white border border-[#E2E2E2] shadow-secondary rounded-[18px] p-3.5"
    >
      <header className="flex items-start justify-between">
        <figure>
          <Image src={image} alt={name} width={175} height={175} />
        </figure>
        <button aria-label="Add to favorites" className="cursor-pointer" onClick={onChangeFavorite}>
          {isProductInFavorite ? <FavoriteFillIcon /> : <FavoriteIcon />}
        </button>
      </header>

      <section className="mt-3 h-[60px]">
        <p className="font-semibold line-clamp-1">{name}</p>
        <p className="line-clamp-1 mt-1 text-sm text-[#7c7c7c]">{description}</p>
      </section>

      <section className="flex items-center justify-between mt-2">
        <div>
          {discount ? (
            <>
              <p className="line-through text-[#808080]">{cost.toLocaleString('ru')} uzs</p>
              <h4 className="font-bold text-green-primary">{discount.toLocaleString('ru')} uzs</h4>
            </>
          ) : (
            <h4 className="font-bold text-green-primary">{cost.toLocaleString('ru')} uzs</h4>
          )}
        </div>
        <div>
          <button
            aria-label="Add to cart"
            className={`flex items-center justify-center bg-green-primary w-11 h-11 rounded-2xl ${
              isProductInCart ? 'cursor-not-allowed opacity-50' : ''
            }`}
            onClick={addToBasket}
          >
            <PlusWhiteIcon />
          </button>
        </div>
      </section>

      <footer
        className="flex items-center justify-center text-[#BDBDBD] mt-3 cursor-pointer"
        onClick={handleDetailsOpen}
      >
        <span>Tafsilotlar</span>
        <span>
          <ArrowRightGrayIcon />
        </span>
      </footer>
    </article>
  )
})

export default ProductCard
