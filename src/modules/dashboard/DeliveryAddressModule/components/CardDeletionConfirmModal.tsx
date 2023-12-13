import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError } from '@/types'
import { useDeleteCardMutation } from '@/hooks/mutations'

interface ICardDeletionConfirmModal {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  selectedCardId?: number | null
  refetchCards: () => void
  isEditMode: boolean
}

const CardDeletionConfirmModal: FC<ICardDeletionConfirmModal> = ({
  isConfirmOpen,
  setIsOpenConfirm,
  isEditMode,
  refetchCards,
  selectedCardId,
}) => {
  const { mutateAsync: deleteCard, isPending: isDeletingCard } = useDeleteCardMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedCardId) {
      const deleteResponse = await deleteCard({ card_id: selectedCardId })

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
