'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { SwitchableRadioType } from '@/components/SwitchableRadio/SwitchableRadio'
import { useUserDeliveryAddressQuery } from '@/hooks/queries'
import { AddressActionModal, CardDeletionConfirmModal } from './components'
import backgroundDeliverAddress from '@/assets/images/dashboard/backgroundDeliverAddress.png'

const PaymentMethodsModule: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { data: addressData, isSuccess, refetch: refetchAddress } = useUserDeliveryAddressQuery()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setIsActionModalOpen(true)
  const openConfirmModal = () => setIsConfirmModalOpen(true)

  const paymentMethods = [
    ...(addressData?.results.map(({ id, floor }) => ({
      key: id,
      title: floor,
      type: 'address',
    })) ?? []),
  ] as SwitchableRadioType[]

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
            <button className="font-medium text-green-primary" onClick={toggleEditMode}>
              {isEditMode ? 'Tasdiqlash' : "O'zgartirish"}
            </button>
          </section>
          <section className="mt-10">
            <SwitchableRadio
              isAddressMode
              items={paymentMethods}
              selectedCardId={selectedCardId as number}
              setSelectedCardId={setSelectedCardId}
              isEditMode={isEditMode}
              onAddAction={openActionModal}
              onDeleteItemAction={openConfirmModal}
            />
          </section>
        </div>
      )}

      <CardDeletionConfirmModal
        isConfirmOpen={isConfirmModalOpen}
        setIsOpenConfirm={setIsConfirmModalOpen}
        refetchCards={refetchAddress}
        isEditMode={isEditMode}
        selectedCardId={selectedCardId}
      />

      <AddressActionModal
        isOpenModal={isActionModalOpen}
        refetchAddress={refetchAddress}
        selectedCardId={selectedCardId}
        setIsOpenModal={setIsActionModalOpen}
        setSelectedCardId={setSelectedCardId}
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
