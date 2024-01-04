'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useShopTypesQuery } from '@/hooks/queries'
import { ProductTypeCardSkeleton } from '@/components/specific'

const ProductTypesModule = () => {
  const { isLoading, data: shopTypesData } = useShopTypesQuery()

  return (
    <div className='mt-8'>
      {isLoading ? (
        <div className="flex gap-[30px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductTypeCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-[22px]">
          {shopTypesData?.results.map(({ id, name, icon }) => (
            <Link
              key={id}
              href={`/products/category?type=${id}`}
              className="shadow-primary flex flex-col justify-between p-5 pb-2.5 w-[188px] h-[150px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary"
            >
              <p className="font-semibold text-green-primary">{name}</p>
              <div className="flex justify-end">
                <Image src={icon} alt={name} width={70} height={70} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductTypesModule
