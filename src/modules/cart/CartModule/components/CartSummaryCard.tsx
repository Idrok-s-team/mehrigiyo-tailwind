import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useCommonStore } from '@/store'
import { Button } from '@/components/common'
import { ROUTES } from '@/constants'

type Props = {
  infoCard: {
    label: string
    value: number
    isLast?: boolean
  }[]
}

const CartItem: FC<Props> = ({ infoCard }) => {
  const { setActiveModal } = useCommonStore()
  const router = useRouter()

  const onBackToMenu = () => {
    router.push(ROUTES.PRODUCTS_CATEGORY)
  }

  return (
    <div className="flex-shrink-0 bg-white rounded-3xl shadow-card mt-11 px-[30px] py-6 w-[347px] sticky top-0 max-lg:w-full">
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
        <Button onClick={() => setActiveModal('cart')}>To'lovga o'tish</Button>
        <Button className="!text-black bg-green-primary/10" onClick={onBackToMenu}>
          Menyuga qaytish
        </Button>
      </div>
    </div>
  )
}
export default CartItem
