import React, { FC, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { clearObject, inputHandler, selectHandler } from '@/utils'
import { Input, Modal, Select, SwitchableRadio } from '@/components'
import { ISelectOption, IUserDeliverAddress } from '@/types'
import { useAddUserDeliverAddressMutation } from '@/hooks/mutations'
import { useUserCountryQuery, useUserDeliveryAddressQuery, useUserRegionQuery } from '@/hooks/queries'

interface ICardActionModal {
  isOpenModal: boolean
  setIsOpenModal: (modal: boolean) => void
}

const initialAddressDetails = {
  name: '',
  full_address: '',
  apartment_office: '',
  floor: '',
  door_or_phone: '',
  instructions: '',
}

const CheckoutActionModal: FC<ICardActionModal> = ({ isOpenModal, setIsOpenModal }) => {
  const [addressDetails, setAddressDetails] = useState(initialAddressDetails)
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { data: addressData, isSuccess, refetch: refetchAddress } = useUserDeliveryAddressQuery()

  const handleAddAddress = async () => {
    // const { name, full_address, apartment_office } = addressDetails
    // if (name.length && full_address.length && apartment_office.length) {
    //   const clearData = clearObject({ ...addressDetails, region: 999 })
    //   const response = await addAddress(clearData as IUserDeliverAddress)
    //   console.log(response)
    //   try {
    //     toast.success("Manzil muvaffaqiyatli qo'shildi")
    //     setAddressDetails(initialAddressDetails)
    //     setIsOpenModal(false)
    //   } catch (error) {
    //     console.log(error)
    //     toast.error("Nimadur xato bo'ldi, iltimos qayta tekshirib ko'ring!")
    //   }
    // }
  }

  const handleCloseModal = () => {
    setAddressDetails(initialAddressDetails)
    setIsOpenModal(false)
  }

  const openActionModal = () => setIsActionModalOpen(true)

  return (
    <Modal
      onSubmit={handleAddAddress}
      onClose={handleCloseModal}
      isOpen={isOpenModal}
      className="w-[446px] px-10"
      // disabled={isAddingAddress}
      // buttonText={isAddingAddress ? "Manzil qo'shilmoqda..." : "Manzil qo'shish"}
    >
      <h4 className="text-center">Buyurtma</h4>
      <div className="mt-3 flex flex-col gap-8 max-h-[50vh] overflow-auto">
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">Yetkazib berish manzili</h6>
          <SwitchableRadio
            isAddressMode
            items={
              addressData?.results.map(({ id, name, full_address }) => ({
                key: id,
                title: name,
                description: full_address,
                type: 'address',
              })) || []
            }
            setSelectedItemId={setSelectedAddressId}
            isEditMode={isEditMode}
            onAddAction={openActionModal}
          />
        </section>
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">To'lov turi</h6>
          <SwitchableRadio
            isAddressMode
            items={
              addressData?.results.map(({ id, name, full_address }) => ({
                key: id,
                title: name,
                description: full_address,
                type: 'address',
              })) || []
            }
            setSelectedItemId={setSelectedAddressId}
            isEditMode={isEditMode}
            onAddAction={openActionModal}
          />
        </section>
      </div>
    </Modal>
  )
}

export default CheckoutActionModal
