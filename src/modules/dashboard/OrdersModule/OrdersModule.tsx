'use client'

import { FC, useState } from 'react'
import { Loader } from '@/components'
import { useShopCheckoutQuery } from '@/hooks/queries'
import { OrderCard } from './components'
import { DeliveryStatusMap } from '@/constants'
import OrderDeletionConfirmModal from './components/OrderDeletionConfirmModal'
import { IShopCheckout } from '@/types'

const OrdersModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<IShopCheckout | null>(null)

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
                <OrderCard
                  key={item.id}
                  orderData={item}
                  statusType={DeliveryStatusMap[item.delivery_status]}
                  // selectedOrder={selectedOrder}
                  // setSelectedOrder={setSelectedOrder}
                  setIsOpenConfirm={setIsConfirmModalOpen}
                />
              ))}
            </div>
          </div>
        )}

        <OrderDeletionConfirmModal
          isConfirmOpen={isConfirmModalOpen}
          setIsOpenConfirm={setIsConfirmModalOpen}
          refetchOrders={refetchOrders}
          isEditMode={isEditMode}
          selectedOrder={selectedOrder}
        />
      </div>
    </>
  )
}

export default OrdersModule
