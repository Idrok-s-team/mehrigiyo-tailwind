import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError, IShopCheckout } from '@/types'
import { useDeleteCardMutation, useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { DeliveryStatusMap } from '@/constants'

interface IProps {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  selectedOrder?: IShopCheckout | null
  refetchOrders: () => void
  isEditMode: boolean
}

const OrderDeletionConfirmModal: FC<IProps> = ({
  isConfirmOpen,
  setIsOpenConfirm,
  isEditMode,
  refetchOrders,
  selectedOrder,
}) => {
  const { mutateAsync: updateCheckout, isPending: updateCheckoutPending } = useUpdateShopCheckoutMutation()

  const handleCardDeletion = async () => {
    if (selectedOrder) {
      const deleteResponse = await updateCheckout({ delivery_status: 4, credit_card: 12 })

      if (deleteResponse.status === 'success') {
        // toast.success("Karta o'chirildi")
        // setIsOpenConfirm(false)
        // refetchOrders()
      } else {
        // const cardError = deleteResponse.data as ICardError
        // toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleClose = () => setIsOpenConfirm(false)

  return (
    <Confirm
      confirmText="Rostdan buyurtmani bekor qilmoqchimisiz?"
      isOpen={isConfirmOpen}
      onClose={handleClose}
      onSubmit={handleCardDeletion}
      // disabled={isDeletingCard}
      // submitButtonText={isDeletingCard ? "Karta o'chirilmoqda" : 'Tasdiqlash'}
    />
  )
}

export default OrderDeletionConfirmModal
