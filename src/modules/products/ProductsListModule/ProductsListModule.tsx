'use client'

import { FC, useMemo, useState } from 'react'
import { SwiperSlide } from 'swiper/react'
import { SeeAllButton, Slider } from '@/components/common'
import { useShopMedicinesQuery, useShopTypesQuery } from '@/hooks/queries'
import { ProductCard, ProductCardSkeleton } from '@/components/specific'
import { ROUTES } from '@/constants'

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
      <div className="flex items-center justify-between max-sm:flex-wrap">
        <h4>{title}</h4>
        <SeeAllButton text="Barchasini ko'rish" href={ROUTES.PRODUCTS_CATEGORY} className="max-sm:mt-2" />
      </div>
      {withFilter && (
        <nav
          className="flex items-center text-lg text-gray-primary overflow-x-auto no-scrollbar"
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
                className={`flex justify-center list-none cursor-pointer ${
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
          <Slider
            breakpoints={{
              1330: {
                slidesPerView: 4.7,
              },
              1180: {
                slidesPerView: 4,
              },
              1040: {
                slidesPerView: 3.5,
              },
              920: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 2.5,
              },
              600: {
                slidesPerView: 2.3,
              },
              520: {
                slidesPerView: 2,
              },
              400: {
                slidesPerView: 1.5,
              },
              360: {
                slidesPerView: 1.1,
              },
              240: {
                slidesPerView: 1,
              },
            }}
            autoplay={{ delay: 2000 }}
          >
            {shopMedicinesData?.results.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard data={product} className='w-[240px]' />
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default ProductsListModule
