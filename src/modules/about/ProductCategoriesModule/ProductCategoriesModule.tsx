'use client'

import { FC } from 'react'
import Image from 'next/image'
import { useShopTypesQuery } from '@/hooks/queries'

const ProductCategoriesModule: FC = () => {
  const { data: shopTypesData, isFetching: isFetchingShopTypes } = useShopTypesQuery()

  return (
    <div className="grid grid-cols-6 gap-4 mt-5">
      {shopTypesData?.results.map(({ id, name, icon }) => (
        <div
          key={id}
          className="h-[60px] px-5 py-6 flex items-center justify-center gap-4 rounded-[18px] bg-green-primary/[0.15]"
        >
          <Image src={icon} alt={name} width={45} height={45} />
          <p className="font-semibold text-green-primary">{name}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductCategoriesModule
