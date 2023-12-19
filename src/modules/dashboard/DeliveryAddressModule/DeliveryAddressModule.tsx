'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { AddressActionModal, AddressDeletionConfirmModal } from './components'
import backgroundDeliverAddress from '@/assets/images/dashboard/backgroundDeliverAddress.png'
import { useUserAddresses } from '@/hooks/checkout'

const DeliveryAddressModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { addressData, isAddressSuccess, refetchAddresses } = useUserAddresses()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setIsActionModalOpen(true)
  const openConfirmModal = () => setIsConfirmModalOpen(true)

  return (
    <div className="w-full min-h-[78.5vh] pr-24 relative">
      {!isAddressSuccess ? (
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
          <section className="w-2/5 mt-10">
            <SwitchableRadio
              isAddressMode
              items={addressData}
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
        refetchAddress={refetchAddresses}
        isEditMode={isEditMode}
      />

      <AddressActionModal
        isOpenModal={isActionModalOpen}
        refetchAddress={refetchAddresses}
        setIsOpenModal={setIsActionModalOpen}
      />

      <Image
        src={backgroundDeliverAddress}
        alt=""
        className={`absolute right-0 bottom-0 duration-300 ${isActionModalOpen ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default DeliveryAddressModule
