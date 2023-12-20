import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError, IShopCheckout } from '@/types'
import { useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { DeliveryStatusMap } from '@/constants'
import { useShopStore } from '@/store'

interface IProps {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  refetchOrders: () => void
}

const OrderCancelConfirmModal: FC<IProps> = ({ isConfirmOpen, setIsOpenConfirm, refetchOrders }) => {
  const { selectedOrder, setSelectedOrder } = useShopStore()
  const { mutateAsync: updateOrder, isPending: updateOrderPending } = useUpdateShopCheckoutMutation()

  const handleCancelOrder = async () => {
    if (selectedOrder) {
      const updateResponse = await updateOrder({
        id: selectedOrder.id,
        delivery_status: 4,
        credit_card: selectedOrder?.credit_card,
        shipping_address: selectedOrder.shipping_address?.id as any,
      })

      if (updateResponse.status === 'success') {
        toast.success('Buyurtma bekor qilindi!')
        setIsOpenConfirm(false)
        refetchOrders()
      } else {
        setIsOpenConfirm(false)
        toast.error("Nimadur xato bo'ldi! Iltimos qayta urinib ko'ring.")
      }
    }
  }

  const handleClose = () => {
    setIsOpenConfirm(false)
    setSelectedOrder(null)
  }

  return (
    <Confirm
      confirmText="Rostdan buyurtmani bekor qilmoqchimisiz?"
      isOpen={isConfirmOpen}
      onClose={handleClose}
      onSubmit={handleCancelOrder}
      disabled={updateOrderPending}
      submitButtonText={updateOrderPending ? 'Buyurtma bekor qilinmoqda...' : 'Tasdiqlash'}
    />
  )
}

export default OrderCancelConfirmModal
