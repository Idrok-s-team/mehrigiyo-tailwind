'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { CardActionModal, CardDeletionConfirmModal } from './components'
import backgroundPaymentMethod from '@/assets/images/dashboard/backgroundPaymentMethod.png'
import { usePaymentMethods } from '@/hooks/checkout'

const PaymentMethodsModule: FC = () => {
  
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { paymentMethods, isPaymentSuccess, refetchPayments } = usePaymentMethods()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setIsActionModalOpen(true)
  const openConfirmModal = () => setIsConfirmModalOpen(true)

  return (
    <div className="w-full min-h-[78.5vh] pr-24 relative">
      {!isPaymentSuccess ? (
        <div className="w-full relative flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="animate-fade-in">
          <section className="flex items-center justify-between">
            <div>
              <h4>To'lov usullari</h4>
              <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
            </div>
            <button className="font-medium text-green-primary z-10" onClick={toggleEditMode}>
              {isEditMode ? 'Tasdiqlash' : "O'zgartirish"}
            </button>
          </section>
          <section className="w-1/3 mt-10">
            <SwitchableRadio
              items={paymentMethods}
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
        refetchCards={refetchPayments}
        isEditMode={isEditMode}
      />

      <CardActionModal
        isOpenModal={isActionModalOpen}
        refetchCards={refetchPayments}
        setIsOpenModal={setIsActionModalOpen}
      />

      <Image
        src={backgroundPaymentMethod}
        alt=""
        className={`absolute right-0 bottom-0 duration-300 ${isActionModalOpen ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default PaymentMethodsModule
