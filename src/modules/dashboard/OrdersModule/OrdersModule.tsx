'use client'

import { FC, useState } from 'react'
import { Loader } from '@/components'
import { useShopCheckoutQuery } from '@/hooks/queries'
import { OrderCard } from './components'
import { DeliveryStatusMap } from '@/constants'

const OrdersModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const { data: ordersData, isSuccess, refetch: refetchOrders } = useShopCheckoutQuery()

  const toggleEditMode = () => setIsEditMode(!isEditMode)

  return (
    <div className="w-full min-h-[78.5vh] pr-24 relative">
      {!isSuccess ? (
        <div className="w-full relative flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="animate-fade-in">
          <section className="flex items-center justify-between">
            <div>
              <h4>Buyurtmalar</h4>
              <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
            </div>
          </section>
          <div className="grid grid-cols-2 gap-5 mt-10">
            {ordersData.data.map((item) => (
              <OrderCard key={item.id} statusType={DeliveryStatusMap[item.delivery_status]} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersModule
