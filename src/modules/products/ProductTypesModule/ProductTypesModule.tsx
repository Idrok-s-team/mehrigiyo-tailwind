'use client'

import { FC } from 'react'
import { useShopTypesQuery } from '@/hooks/queries'
import Link from 'next/link'
import Image from 'next/image'

const ProductTypesModule: FC = () => {
  const { data: shopTypesData, isFetching: isFetchingShopTypes } = useShopTypesQuery()

  return (
    <div className="grid grid-cols-6 gap-[22px] mt-8">
      {shopTypesData?.results.map(({ id, name, icon }) => (
        <Link
          key={id}
          href={'#'}
          className="shadow-primary flex flex-col justify-between p-5 pb-2.5 w-[188px] h-[150px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary"
        >
          <h6 className="font-semibold text-green-primary">{name}</h6>
          <div className="flex justify-end">
            <Image src={icon} alt={name} width={70} height={70} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductTypesModule
