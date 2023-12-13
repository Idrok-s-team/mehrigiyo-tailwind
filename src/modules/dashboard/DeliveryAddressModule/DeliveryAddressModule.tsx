'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { useUserDeliveryAddressQuery } from '@/hooks/queries'
import { AddressActionModal, AddressDeletionConfirmModal } from './components'
import backgroundDeliverAddress from '@/assets/images/dashboard/backgroundDeliverAddress.png'

const PaymentMethodsModule: FC = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { data: addressData, isSuccess, refetch: refetchAddress } = useUserDeliveryAddressQuery()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setIsActionModalOpen(true)
  const openConfirmModal = () => setIsConfirmModalOpen(true)

  return (
    <div className="w-full min-h-[78.5vh] pr-24 relative">
      {!isSuccess ? (
        <div className="w-full relative flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="animate-fade-in">
          <section className="flex items-center justify-between">
            <div>
              <h4>Yetkazish manzili</h4>
              <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
            </div>
            <button className="font-medium text-green-primary z-10" onClick={toggleEditMode}>
              {isEditMode ? 'Tasdiqlash' : "O'zgartirish"}
            </button>
          </section>
          <section className="mt-10">
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
              onDeleteItemAction={openConfirmModal}
            />
          </section>
        </div>
      )}

      <AddressDeletionConfirmModal
        isConfirmOpen={isConfirmModalOpen}
        setIsOpenConfirm={setIsConfirmModalOpen}
        refetchAddress={refetchAddress}
        isEditMode={isEditMode}
        selectedAddressId={selectedAddressId}
      />

      <AddressActionModal
        isOpenModal={isActionModalOpen}
        refetchAddress={refetchAddress}
        selectedAddressId={selectedAddressId}
        setIsOpenModal={setIsActionModalOpen}
        setSelectedAddressId={setSelectedAddressId}
      />

      <Image
        src={backgroundDeliverAddress}
        alt=""
        className={`absolute right-0 bottom-0 duration-300 ${isActionModalOpen ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default PaymentMethodsModule
