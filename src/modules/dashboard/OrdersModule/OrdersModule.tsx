'use client'

import { FC } from 'react'
import { Loader } from '@/components/common'
import { useShopCheckoutQuery } from '@/hooks/queries'
import { OrderCancelConfirmModal, OrderCard, OrderDetailsModal } from './components'
import { DeliveryStatusMap } from '@/constants'

const OrdersModule: FC = () => {
  const { data: ordersData, isSuccess, refetch: refetchOrders } = useShopCheckoutQuery()

  return (
    <>
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
                <OrderCard key={item.id} orderData={item} statusType={DeliveryStatusMap[item.delivery_status]} />
              ))}
            </div>
          </div>
        )}

        <OrderCancelConfirmModal refetchOrders={refetchOrders} />

        <OrderDetailsModal />
      </div>
    </>
  )
}

export default OrdersModule
