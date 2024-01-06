'use client'

import { FC, useMemo, useState } from 'react'
import { SeeAllButton, Slider } from '@/components/common'
import { useShopMedicinesQuery, useShopTypesQuery } from '@/hooks/queries'
import { ProductCard, ProductCardSkeleton } from '@/components/specific'
import { SwiperSlide } from 'swiper/react'

type Props = {
  title?: string
  withFilter?: boolean
}

const ProductsListModule: FC<Props> = ({ title = "Mahsulotlarimiz ro'yxati", withFilter = true }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('')

  const { data: shopTypesData, isLoading: isLoadingShopTypes } = useShopTypesQuery()
  const { data: shopMedicinesData, isLoading: isLoadingMedicines } = useShopMedicinesQuery({
    params: { type_ides: selectedFilter },
  })

  const filterValues = useMemo(
    () => [
      { key: '', title: 'Hammasi' },
      ...(shopTypesData?.results.map((value) => ({ key: value.id.toString(), title: value.name })) || []),
    ],
    [shopTypesData?.results],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>{title}</h4>
        <SeeAllButton text="Barchasini ko'rish" href="/products/category" />
      </div>
      {withFilter && (
        <nav
          className="flex items-center text-lg text-gray-primary animate-fade-in"
          style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
        >
          {isLoadingShopTypes ? (
            <div className="flex gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`skeleton-filter-${index}`} className="w-24 h-7 bg-gray-300 rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            filterValues?.map(({ key, title }) => (
              <li
                key={key}
                className={`list-none cursor-pointer ${
                  selectedFilter === key ? 'text-green-primary font-medium duration-300' : ''
                }`}
                onClick={() => setSelectedFilter(key)}
              >
                {title}
              </li>
            ))
          )}
        </nav>
      )}

      <div className="mt-10">
        {isLoadingMedicines ? (
          <div className="flex gap-[30px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : Number(shopMedicinesData?.count) < 1 ? (
          <h3 className="w-full min-h-[40vh] flex items-center justify-center">
            Hozircha ushbu bo'limda yangiliklar yo'q
          </h3>
        ) : (
          <Slider slidesPerView={4.7} autoplay={{ delay: 2000 }}>
            {shopMedicinesData?.results.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard data={product} />
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default ProductsListModule
