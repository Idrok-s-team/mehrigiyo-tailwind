/* eslint-disable react/no-unescaped-entities */
'use client'

import { FC, useMemo, useState } from 'react'
import { Drawer, ProductCard, ProductCardSkeleton, SeeAllButton, Slider } from '@/components'
import { useShopMedicinesQuery, useShopTypesQuery } from '@/hooks/queries'
import { IShopMedicines } from '@/types'

type Props = {
  title?: string
  withFilter?: boolean
}

const ProductsListModule: FC<Props> = ({ title = "Mahsulotlarimiz ro'yxati", withFilter = true }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IShopMedicines | null>(null)

  const { data: shopMedicinesData, isFetching: isFetchingMedicines } = useShopMedicinesQuery()
  const { data: shopTypesData, isFetching: isFetchingShopTypes } = useShopTypesQuery()

  const filterValues = useMemo(
    () => [
      { key: '', title: 'Hammasi' },
      ...(shopTypesData?.results.map((value) => ({ key: value.id, title: value.name })) || []),
    ],
    [shopTypesData?.results],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>{title}</h4>
        <SeeAllButton text="Barchasini ko'rish" />
      </div>
      {withFilter && (
        <nav
          className="flex items-center text-lg text-gray-primary"
          style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
        >
          {isFetchingShopTypes ? (
            <div className={`w-20 h-10 grid grid-cols-4 gap-7`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full h-5 bg-gray-300 rounded-md duration-300 animate-pulse"></div>
              ))}
            </div>
          ) : (
            filterValues?.map(({ key, title }) => (
              <li key={key} className="cursor-pointer list-none">
                {title}
              </li>
            ))
          )}
        </nav>
      )}

      <div className="mt-10">
        {isFetchingMedicines ? (
          <div className="grid grid-cols-5 gap-7 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Slider slides={{ perView: 4.7 }}>
            {shopMedicinesData?.results.map((product) => (
              <div key={product.id} className="keen-slider__slide">
                <ProductCard product={product} setIsDetailsOpen={setIsOpen} setSelectedProduct={setSelectedProduct} />
              </div>
            ))}
          </Slider>
        )}
      </div>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} product={selectedProduct} />
    </>
  )
}

export default ProductsListModule
