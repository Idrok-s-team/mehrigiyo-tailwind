import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components/common'
import { ICardError, IShopCheckout } from '@/types'
import { useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { DeliveryStatusMap, WARNING_TEXTS } from '@/constants'
import { useCommonStore, useShopStore } from '@/store'

interface IProps {
  refetchOrders: () => void
}

const OrderCancelConfirmModal: FC<IProps> = ({ refetchOrders }) => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedOrder, updateShopState } = useShopStore()
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
        setActiveModal(null)
        refetchOrders()
      } else {
        setActiveModal(null)
        toast.error(WARNING_TEXTS.SOMETHING_WENT_WRONG)
      }
    }
  }

  const handleClose = () => {
    setActiveModal(null)
    updateShopState('selectedOrder', null)
  }

  return (
    <Confirm
      confirmText="Rostdan buyurtmani bekor qilmoqchimisiz?"
      isOpen={activeModal === 'orderConfirm'}
      onClose={handleClose}
      onSubmit={handleCancelOrder}
      disabled={updateOrderPending}
      submitButtonText={updateOrderPending ? 'Buyurtma bekor qilinmoqda...' : 'Tasdiqlash'}
    />
  )
}

export default OrderCancelConfirmModal
