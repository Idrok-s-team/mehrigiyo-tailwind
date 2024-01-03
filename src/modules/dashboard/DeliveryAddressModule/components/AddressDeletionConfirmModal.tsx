import React, { FC } from 'react'
import toast from 'react-hot-toast'
import { Confirm } from '@/components/common'
import { ICardError } from '@/types'
import { useDeleteUserDeliverAddressMutation } from '@/hooks/mutations'
import { useCommonStore, useShopStore } from '@/store'

interface ICardDeletionConfirmModal {
  refetchAddress: () => void
  isEditMode: boolean
}

const AddressDeletionConfirmModal: FC<ICardDeletionConfirmModal> = ({ isEditMode, refetchAddress }) => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedAddress } = useShopStore()
  const { mutateAsync: deleteAddress, isPending: isDeletingAddress } = useDeleteUserDeliverAddressMutation()

  const handleCardDeletion = async () => {
    if (isEditMode && selectedAddress) {
      const deleteResponse = await deleteAddress({ pk: selectedAddress.id })

      if (deleteResponse.status === 'success') {
        toast.success("Manzil o'chirildi")
        setActiveModal(null)
        refetchAddress()
      } else {
        const cardError = deleteResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleClose = () => setActiveModal(null)

  return (
    <Confirm
      confirmText="Ushbu manzilni o'chirishga ishonchingiz komilmi?"
      isOpen={activeModal === 'addressConfirm'}
      onClose={handleClose}
      onSubmit={handleCardDeletion}
      disabled={isDeletingAddress}
      submitButtonText={isDeletingAddress ? "Manzil o'chirilmoqda" : 'Tasdiqlash'}
    />
  )
}

export default AddressDeletionConfirmModal
