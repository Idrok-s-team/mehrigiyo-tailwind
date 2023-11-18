/* eslint-disable react/no-unescaped-entities */
'use client'

import { FC, PropsWithChildren, useState } from 'react'
import { Carousel, Drawer, ProductCard, ProductCardSkeleton, SeeAllButton } from '@/components'
import { useShopMedicinesQuery, useShopTypesQuery } from '@/hooks/queries'

type Props = PropsWithChildren

export const ProductsListModule: FC<Props> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { data: shopMedicinesData, isFetching: isFetchingMedicines } = useShopMedicinesQuery()
  const { data: shopTypesData, isFetching: isFetchingShopTypes } = useShopTypesQuery()

  const filterValues = [
    { key: '', title: 'Hammasi' },
    ...(shopTypesData?.results.map((value) => ({ key: value.id, title: value.name })) || []),
  ]

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Mahsulotlarimiz ro'yxati</h2>
        <SeeAllButton text="Barchasini ko'rish" />
      </div>
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

      <div className="mt-10">
        {isFetchingMedicines ? (
          <div className="grid grid-cols-5 gap-7 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Carousel>
            {shopMedicinesData?.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Carousel>
        )}
      </div>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}></Drawer>
    </>
  )
}
