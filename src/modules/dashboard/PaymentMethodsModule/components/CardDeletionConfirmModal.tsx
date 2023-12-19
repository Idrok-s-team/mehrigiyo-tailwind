import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError } from '@/types'
import { useDeleteCardMutation } from '@/hooks/mutations'
import { useShopStore } from '@/store'

interface IProps {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  refetchCards: () => void
  isEditMode: boolean
}

const CardDeletionConfirmModal: FC<IProps> = ({ isConfirmOpen, setIsOpenConfirm, isEditMode, refetchCards }) => {
  const { selectedPaymentCard } = useShopStore()
  const { mutateAsync: deleteCard, isPending: isDeletingCard } = useDeleteCardMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedPaymentCard) {
      const deleteResponse = await deleteCard({ card_id: selectedPaymentCard.id })

      if (deleteResponse.status === 'success') {
        toast.success("Karta o'chirildi")
        setIsOpenConfirm(false)
        refetchCards()
      } else {
        const cardError = deleteResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleClose = () => setIsOpenConfirm(false)

  return (
    <Confirm
      confirmText="Ushbu kartani o'chirishga ishonchingiz komilmi?"
      isOpen={isConfirmOpen}
      onClose={handleClose}
      onSubmit={handleCardDeletion}
      disabled={isDeletingCard}
      submitButtonText={isDeletingCard ? "Karta o'chirilmoqda" : 'Tasdiqlash'}
    />
  )
}

export default CardDeletionConfirmModal
