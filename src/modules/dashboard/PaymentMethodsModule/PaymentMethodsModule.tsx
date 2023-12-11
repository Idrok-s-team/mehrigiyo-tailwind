'use client'

import { FC, useEffect, useState } from 'react'
import { Loader, SwitchableRadio } from '@/components'
import { formatPlasticCardNumber } from '@/utils'
import { SwitchableRadioType } from '@/components/SwitchableRadio/SwitchableRadio'
import { useGetCardQuery } from '@/hooks/queries'
import { useDeleteCardMutation } from '@/hooks/mutations'

const PaymentMethodsModule: FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<SwitchableRadioType[]>([
    { key: 1, title: 'Naqd pul', type: 'cash' },
  ])
  const [selectedCardId, setSelectedCardId] = useState<number>()
  const [isEditMode, setIsEditMode] = useState(false)

  const { data: cardsData, isSuccess } = useGetCardQuery()
  const { mutateAsync: deleteCard } = useDeleteCardMutation()

  useEffect(() => {
    if (isSuccess && cardsData?.data?.length > 0) {
      const cards: SwitchableRadioType[] = cardsData.data
        .filter((item) => item.verify)
        .map(({ id, number }) => ({
          key: id,
          title: formatPlasticCardNumber(number),
          type: 'plastic',
        }))

      setPaymentMethods((prevMethods) => [...prevMethods, ...cards])
    }
  }, [isSuccess, cardsData?.data])

  const handleDeleteCard = async () => {
    try {
      const res = await deleteCard({ card_id: selectedCardId as number })
    } catch (error) {
      // Handle error if needed
    }
  }

  return (
    <div className="w-full pr-24">
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
            <button className="font-medium text-green-primary" onClick={() => setIsEditMode(!isEditMode)}>
              {isEditMode ? 'Tasdiqlash' : "O'zgartirish"}
            </button>
          </section>
          <section className="mt-10">
            <SwitchableRadio
              items={paymentMethods}
              selectedCardId={selectedCardId as number}
              setSelectedCardId={setSelectedCardId}
              isEditMode={isEditMode}
            />
          </section>
        </div>
      )}
    </div>
  )
}

export default PaymentMethodsModule
