'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useShopTypesQuery } from '@/hooks/queries'
import { ProductTypeCardSkeleton } from '@/components/specific'

const ProductTypesModule = () => {
  const { data, isLoading } = useShopTypesQuery()

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="flex gap-[30px]">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductTypeCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      ) : (
        <div className="gap-x-[22px] gap-y-[30px] grid grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-3 max-sm:grid-cols-2 max-xs:grid-cols-1 max-xs:gap-y-3">
          {data?.results.map(({ id, name, icon }) => (
            <Link
              key={id}
              href={`/products/category?type=${id}`}
              className="shadow-primary flex flex-col justify-between p-5 pb-2.5 w-[188px] h-[150px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary justify-self-center"
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
