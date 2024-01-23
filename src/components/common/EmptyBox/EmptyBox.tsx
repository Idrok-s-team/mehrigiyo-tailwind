import React, { FC } from 'react'
import Image from 'next/image'
import boxGif from '@/assets/images/product/box.gif'
import { SeeAllButton } from '@/components/common'

type Props = {
  title: string
  description?: string
  withoutButton?: boolean
}

const EmptyBox: FC<Props> = ({ title, description, withoutButton = false }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[70vh] animate-fade-in">
      <div className="relative">
        <Image src={boxGif} alt="" className="rounded-[35px]" width={150} height={150} />
        <span className="absolute flex items-center justify-center text-lg font-semibold text-white rounded-full -right-2 -bottom-2 w-9 h-9 bg-green-primary">
          0
        </span>
      </div>
      <h5 className="text-gray-primary mt-7">{title}</h5>
      <p className="mt-2.5 text-sm text-gray-primary w-1/3 text-center">{description}</p>
      {!withoutButton && (
        <div className="mt-7">
          <SeeAllButton text="Bosh sahifaga qaytish" />
        </div>
      )}
    </div>
  )
}

export default EmptyBox
