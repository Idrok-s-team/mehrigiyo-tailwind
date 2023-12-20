import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError } from '@/types'
import { useDeleteCardMutation } from '@/hooks/mutations'
import { useCommonStore, useShopStore } from '@/store'

interface IProps {
  refetchCards: () => void
  isEditMode: boolean
}

const CardDeletionConfirmModal: FC<IProps> = ({ isEditMode, refetchCards }) => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedPaymentCard } = useShopStore()
  const { mutateAsync: deleteCard, isPending: isDeletingCard } = useDeleteCardMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedPaymentCard) {
      const deleteResponse = await deleteCard({ card_id: selectedPaymentCard.id })

      if (deleteResponse.status === 'success') {
        toast.success("Karta o'chirildi")
        setActiveModal(null)
        refetchCards()
      } else {
        const cardError = deleteResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleClose = () => setActiveModal(null)

  return (
    <Confirm
      confirmText="Ushbu kartani o'chirishga ishonchingiz komilmi?"
      isOpen={activeModal === 'cartConfirm'}
      onClose={handleClose}
      onSubmit={handleCardDeletion}
      disabled={isDeletingCard}
      submitButtonText={isDeletingCard ? "Karta o'chirilmoqda" : 'Tasdiqlash'}
    />
  )
}

export default CardDeletionConfirmModal
