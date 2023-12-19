import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components'
import { ICardError } from '@/types'
import { useDeleteUserDeliverAddressMutation } from '@/hooks/mutations'
import { useShopStore } from '@/store'

interface ICardDeletionConfirmModal {
  isConfirmOpen: boolean
  setIsOpenConfirm: (modal: boolean) => void
  refetchAddress: () => void
  isEditMode: boolean
}

const AddressDeletionConfirmModal: FC<ICardDeletionConfirmModal> = ({
  isConfirmOpen,
  setIsOpenConfirm,
  isEditMode,
  refetchAddress,
}) => {
  const { selectedAddress } = useShopStore()
  const { mutateAsync: deleteAddress, isPending: isDeletingAddress } = useDeleteUserDeliverAddressMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedAddress) {
      const deleteResponse = await deleteAddress({ pk: selectedAddress.id })

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
