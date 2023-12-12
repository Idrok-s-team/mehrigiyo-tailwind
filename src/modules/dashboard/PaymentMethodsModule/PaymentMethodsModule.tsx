'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { Loader, SwitchableRadio } from '@/components'
import { formatPlasticCardNumber } from '@/utils'
import { SwitchableRadioType } from '@/components/SwitchableRadio/SwitchableRadio'
import { useGetCardQuery } from '@/hooks/queries'
import { CardActionModal, CardDeletionConfirmModal } from './components'
import backgroundPaymentMethod from '@/assets/images/dashboard/backgroundPaymentMethod.png'

const PaymentMethodsModule: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

  const { data: cardsData, isSuccess, refetch: refetchCards } = useGetCardQuery()

  const toggleEditMode = () => setIsEditMode(!isEditMode)
  const openActionModal = () => setIsActionModalOpen(true)
  const openConfirmModal = () => setIsConfirmModalOpen(true)

  const cashPayment = [{ key: 1, title: 'Naqd pul', type: 'cash' }]
  const paymentMethods = [
    ...cashPayment,
    ...(cardsData?.data
      ?.filter((item) => item.verify)
      .map(({ id, number }) => ({
        key: id,
        title: formatPlasticCardNumber(number),
        type: 'plastic',
      })) ?? []),
  ] as SwitchableRadioType[]

  return (
    <div className="w-full pr-24 relative">
      {!isSuccess ? (
        <div className="w-full flex items-center justify-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="animate-fade-in">
          <section className="flex items-center justify-between">
            <div>
              <h4>To'lov usullari</h4>
              <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
            </div>
            <button className="font-medium text-green-primary" onClick={toggleEditMode}>
              {isEditMode ? 'Tasdiqlash' : "O'zgartirish"}
            </button>
          </section>
          <section className="mt-10">
            <SwitchableRadio
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
        refetchCards={refetchCards}
        isEditMode={isEditMode}
        selectedCardId={selectedCardId}
      />

      <CardActionModal
        isOpenModal={isActionModalOpen}
        refetchCards={refetchCards}
        selectedCardId={selectedCardId}
        setIsOpenModal={setIsActionModalOpen}
        setSelectedCardId={setSelectedCardId}
      />

      <Image
        src={backgroundPaymentMethod}
        alt=""
        className={`absolute right-0 duration-300 ${isActionModalOpen ? 'scale-110' : ''}`}
      />
    </div>
  )
}

export default PaymentMethodsModule
