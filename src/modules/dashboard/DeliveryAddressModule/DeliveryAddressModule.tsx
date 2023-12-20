'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { AddressActionModal, AddressDeletionConfirmModal } from './components'
import backgroundDeliverAddress from '@/assets/images/dashboard/backgroundDeliverAddress.png'
import { useUserAddresses } from '@/hooks/checkout'
import { useCommonStore } from '@/store'

const DeliveryAddressModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const { activeModal, setActiveModal } = useCommonStore()
  const { addressData, isAddressSuccess, refetchAddresses } = useUserAddresses()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setActiveModal('address')
  const openConfirmModal = () => setActiveModal('addressConfirm')

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

      <AddressDeletionConfirmModal refetchAddress={refetchAddresses} isEditMode={isEditMode} />

      <AddressActionModal refetchAddress={refetchAddresses} />

      <Image
        src={backgroundDeliverAddress}
        alt=""
        className={`absolute right-0 bottom-0 duration-300 ${activeModal === 'address' ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default DeliveryAddressModule
