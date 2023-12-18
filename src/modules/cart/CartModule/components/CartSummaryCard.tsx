import React, { FC } from 'react'
import { Button } from '@/components'

type Props = {
  isOpenModal: boolean
  setIsOpenModal: (modal: boolean) => void
  infoCard: {
    label: string
    value: number
    isLast?: boolean
  }[]
}

const CartItem: FC<Props> = ({ infoCard, isOpenModal, setIsOpenModal }) => {
  return (
    <div className="flex-shrink-0 bg-white rounded-3xl shadow-card mt-11 px-[30px] py-6 w-[347px] sticky top-0">
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
        <Button onClick={() => setIsOpenModal(true)}>To'lovga o'tish</Button>
        <Button className="!text-black bg-green-primary/10">Menyuga qaytish</Button>
      </div>
    </div>
  )
}
export default CartItem
