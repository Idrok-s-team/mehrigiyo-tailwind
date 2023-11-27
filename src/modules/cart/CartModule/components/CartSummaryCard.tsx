/* eslint-disable react/no-unescaped-entities */
import { DeleteIcon, MinusIcon, PlusIcon } from '@/assets/icons'
import { Button } from '@/components'
import { IShopCart } from '@/types'
import Image from 'next/image'
import React, { FC } from 'react'

type Props = {
  infoCard: {
    label: string
    value: number
    isLast?: boolean
  }[]
}

const CartItem: FC<Props> = ({ infoCard }) => {
  return (
    <div className="flex-shrink-0 bg-white rounded-3xl shadow-card mt-11 px-[30px] py-6 w-[347px] sticky top-[200px]">
      <div className="flex flex-col gap-4">
        {infoCard.map(({ label, value, isLast }) => (
          <div key={label} className="flex items-center justify-between">
            <p className={`${isLast ? 'text-lg font-semibold' : ''}`}>{label}</p>
            <p className={`${isLast ? 'text-lg font-semibold' : ''}`}>
              {value?.toLocaleString('ru')} {isLast && "so'm"}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-[30px]">
        <Button>To'lovga o'tish</Button>
        <Button className="!text-black bg-green-primary/10">Menyuga qaytish</Button>
      </div>
    </div>
  )
}
export default CartItem
