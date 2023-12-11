'use client'

import React, { FC, useState } from 'react'
import clsx from 'clsx'
import toast from 'react-hot-toast'
import { MaskInput, Modal } from '..'
import { CashIcon, CloseCircleRedIcon, PlasticCardIcon, PlusCircleGrayIcon } from '@/assets/icons'
import { useAddCardMutation, useCardConfirmCodeMutation, useVerifyCardMutation } from '@/hooks/mutations'
import { inputHandler } from '@/utils'
import { ICard, ICardError, IVerifyCard } from '@/types'
import { useGetCardQuery } from '@/hooks/queries'

type RadioType = `address` | `cash` | `plastic`

export type SwitchableRadioType = {
  key: number
  title: string
  type: RadioType
}

type Props = {
  items: SwitchableRadioType[]
  selectedCardId: number
  setSelectedCardId: (id: number) => void
  isEditMode: boolean
}

const initialFields = {
  cardNumber: '',
  cardExpires: '',
  otp: '',
}

const SwitchableRadio: FC<Props> = ({ items, selectedCardId, setSelectedCardId, isEditMode }) => {
  const [activeSwitch, setActiveSwitch] = useState(items[0].key)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOtp, setIsOtp] = useState(false)
  const [fields, setFields] = useState(initialFields)
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null)
  const [otpTimeout, setOtpTimeout] = useState<number>(60)
  const [timerActive, setTimerActive] = useState<boolean>(false)

  const { refetch } = useGetCardQuery()
  const { mutateAsync: addCard, isPending: isAddCardPending } = useAddCardMutation()
  const { mutateAsync: verifyCard, isPending: isVerifyCardMutation } = useVerifyCardMutation()
  const { mutateAsync: confirmCode, isPending: isConfirmCodePending } = useCardConfirmCodeMutation()

  const handleTimerStart = () => {
    setTimerActive(true)
    const timer = setInterval(() => {
      setOtpTimeout((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer)
          setTimerActive(false)
        }
        return prevTime - 1
      })
    }, 1000)
  }

  const handleAddCard = async () => {
    const { cardNumber, cardExpires } = fields

    if (cardNumber.length && cardExpires.length) {
      const cardResponse = await addCard({
        number: cardNumber.split(' ').join(''),
        expire: cardExpires.split('/').join(''),
      })

      if (cardResponse.status === 'success') {
        toast.success('Sms kodni kiriting')
        let cardData = cardResponse.data as ICard

        const verifyResponse = await verifyCard({ card_id: cardData.id })
        const verifyData = verifyResponse.data as IVerifyCard

        setVerifiedPhone(verifyData.result.phone)
        setSelectedCardId(cardData.id)
        setIsOtp(true)
        handleTimerStart()
      } else {
        const cardError = cardResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleConfirmCode = async () => {
    const { otp } = fields

    if (otp.length > 5) {
      const confirmResponse = await confirmCode({
        card_id: selectedCardId,
        code: otp.split(' ').join(''),
      })

      if (confirmResponse.status === 'success') {
        toast.success("Karta muvaqqiyatli qo'shildi")
        handleCloseModal()
        refetch()
      } else {
        const cardError = confirmResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const getIcon = (type: RadioType) => {
    if (type === 'cash') {
      return <CashIcon />
    } else if (isEditMode) {
      return <CloseCircleRedIcon />
    } else {
      return <PlasticCardIcon />
    }
  }
  const handleSwitchChange = (key: number) => {
    setActiveSwitch(key)
    setSelectedCardId(key)
  }

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setIsOtp(false)
    setOtpTimeout(60)
    setTimerActive(false)
  }

  const getElementClassNames = (key: number) =>
    clsx(
      'w-full h-[50px] flex items-center justify-between px-5 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out',
      {
        'bg-green-primary/20': activeSwitch === key,
      },
    )

  const getRoundIndicatorClassNames = (key: number) =>
    clsx('w-[22px] h-[22px] rounded-full transition-colors duration-300 ease-in-out', {
      'border-2 border-white bg-green-primary': activeSwitch === key,
      'border-2 border-[#C4C4C4]': activeSwitch !== key,
    })

  return (
    <div className="w-[360px] flex flex-col">
      {items.map(({ title, type, key }) => (
        <div key={key} className={getElementClassNames(key)} onClick={() => handleSwitchChange(key)}>
          <div className="flex items-center gap-[13px]">
            <span className={getRoundIndicatorClassNames(key)}></span>
            <h6 className="text-base">{title}</h6>
          </div>
          <div className='animate-fade-in'>{getIcon(type)}</div>
        </div>
      ))}
      <button
        className="w-full h-[50px] flex items-center px-5 gap-[13px] bg-gray-primary/10 rounded-xl"
        onClick={handleOpenModal}
      >
        <span>
          <PlusCircleGrayIcon />
        </span>
        <p className="text-gray-primary">Karta qo'shish</p>
      </button>

      <Modal
        onSubmit={isOtp ? handleConfirmCode : handleAddCard}
        onClose={handleCloseModal}
        isOpen={isOpenModal}
        disabled={isAddCardPending || isConfirmCodePending || (isOtp && !timerActive)}
        buttonText={
          isAddCardPending
            ? 'Karta tekshirilmoqda...'
            : isConfirmCodePending
              ? 'Sms kod tekshirilmoqda...'
              : isOtp
                ? 'Sms kodni tasdiqlash'
                : "Karta qo'shish"
        }
      >
        <h4 className="text-center">{isOtp ? 'Kartani tasdiqlash' : 'Karta qo’shish'}</h4>
        <div className="mt-2">
          {isOtp ? (
            <>
              <MaskInput
                id="otp"
                name="otp"
                label={`Sms kodni kiriting (00:${otpTimeout < 10 ? `0${otpTimeout}` : otpTimeout})`}
                mask="9 9 9 9 9 9"
                placeholder="- - - - - -"
                maskChar=" "
                autoComplete="one-time-code"
                required
                onChange={inputHandler(setFields)}
              />
              {verifiedPhone && <p className="mt-3">Kod ushbu raqamga yuborilgan (+{verifiedPhone})</p>}
            </>
          ) : (
            <div className="flex flex-col w-full gap-5">
              <MaskInput
                id="cardNumber"
                name="cardNumber"
                label="Karta raqami"
                mask="9999 9999 9999 9999"
                placeholder="0000 0000 0000 0000"
                maskChar=" "
                autoComplete="cc-number"
                required
                onChange={inputHandler(setFields)}
              />
              <MaskInput
                id="cardExpires"
                name="cardExpires"
                label="Amal qilish muddati"
                className="!w-1/3"
                mask="99/99"
                placeholder="oo/yy"
                maskChar=" "
                autoComplete="cc-exp"
                required
                onChange={inputHandler(setFields)}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default SwitchableRadio
