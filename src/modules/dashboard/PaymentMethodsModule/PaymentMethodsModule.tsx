'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components/common'
import { CardActionModal, CardDeletionConfirmModal } from './components'
import backgroundPaymentMethod from '@/assets/images/dashboard/backgroundPaymentMethod.png'
import { usePaymentMethods } from '@/hooks/checkout'
import { useCommonStore } from '@/store'

const PaymentMethodsModule: FC = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const { activeModal, setActiveModal } = useCommonStore()
  const { paymentMethods, isPaymentSuccess, refetchPayments } = usePaymentMethods()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setActiveModal('cart')
  const openConfirmModal = () => setActiveModal('cartConfirm')

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

      <CardDeletionConfirmModal refetchCards={refetchPayments} isEditMode={isEditMode} />

      <CardActionModal refetchCards={refetchPayments} />

      <Image
        src={backgroundPaymentMethod}
        alt=""
        className={`absolute right-0 bottom-0 duration-300 ${activeModal === 'cart' ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default PaymentMethodsModule
