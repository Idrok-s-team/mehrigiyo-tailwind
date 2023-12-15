'use client'

import { FC, useState } from 'react'
import { Loader } from '@/components'
import { useShopCheckoutQuery } from '@/hooks/queries'
import { OrderCard } from './components'

const OrdersModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const { data: ordersData, isSuccess, refetch: refetchOrders } = useShopCheckoutQuery()
  console.log(ordersData)

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
          <div className="grid grid-cols-2 gap-10 mt-10">
            <OrderCard />
            <OrderCard statusType="OnDelivery" />
            <OrderCard statusType="Delivered" />
            <OrderCard statusType="Returned" />
          </div>
        </div>
      )}
    </div>
  )
}

export default OrdersModule
