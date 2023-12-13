import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError } from '@/types'
import { useDeleteCardMutation, useDeleteUserDeliverAddressMutation } from '@/hooks/mutations'

interface ICardDeletionConfirmModal {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  selectedAddressId?: number | null
  refetchAddress: () => void
  isEditMode: boolean
}

const AddressDeletionConfirmModal: FC<ICardDeletionConfirmModal> = ({
  isConfirmOpen,
  setIsOpenConfirm,
  isEditMode,
  refetchAddress,
  selectedAddressId,
}) => {
  const { mutateAsync: deleteAddress, isPending: isDeletingAddress } = useDeleteUserDeliverAddressMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedAddressId) {
      const deleteResponse = await deleteAddress({ pk: selectedAddressId })

      if (deleteResponse.status === 'success') {
        toast.success("Manzil o'chirildi")
        setIsOpenConfirm(false)
        refetchAddress()
      } else {
        const cardError = deleteResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleClose = () => setIsOpenConfirm(false)

  return (
    <Confirm
      confirmText="Ushbu manzilni o'chirishga ishonchingiz komilmi?"
      isOpen={isConfirmOpen}
      onClose={handleClose}
      onSubmit={handleCardDeletion}
      disabled={isDeletingAddress}
      submitButtonText={isDeletingAddress ? "Manzil o'chirilmoqda" : 'Tasdiqlash'}
    />
  )
}

export default AddressDeletionConfirmModal
