'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useShopTypesQuery } from '@/hooks/queries'

const ProductCategoriesModule: FC = () => {
  const { data, isLoading } = useShopTypesQuery()

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="grid grid-cols-6 gap-x-[22px] gap-y-[30px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[60px] px-5 py-6 flex items-center justify-center gap-4 rounded-[18px] bg-green-primary/[0.15] animate-pulse"
            >
              <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-x-[22px] gap-y-[30px]">
          {data?.results.map(({ id, name, icon }) => (
            <div
              key={id}
              className="h-[60px] px-5 py-6 flex items-center justify-center gap-4 rounded-[18px] bg-green-primary/[0.15]"
            >
              <Image src={icon} alt={name} width={45} height={45} />
              <p className="font-semibold text-green-primary">{name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductCategoriesModule
