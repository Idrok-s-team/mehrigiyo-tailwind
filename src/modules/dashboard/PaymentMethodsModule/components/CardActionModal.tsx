import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { inputHandler } from '@/utils'
import { MaskInput, Modal } from '@/components'
import { ICard, ICardError, IVerifyCard } from '@/types'
import { useAddCardMutation, useCardConfirmCodeMutation, useVerifyCardMutation } from '@/hooks/mutations'

interface ICardActionModal {
  isOpenModal: boolean
  setIsOpenModal: (modal: boolean) => void
  refetchCards: () => void
}

const initialCardDetails = {
  cardNumber: '',
  cardExpires: '',
  otp: '',
}

const CardActionModal: FC<ICardActionModal> = ({ isOpenModal, setIsOpenModal, refetchCards }) => {
  const [isOtpMode, setIsOtpMode] = useState(false)
  const [cardDetails, setCardDetails] = useState(initialCardDetails)
  const [otpTimeout, setOtpTimeout] = useState<number>(60)
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null)

  const { mutateAsync: addCard, isPending: isAddingCard } = useAddCardMutation()
  const { mutateAsync: verifyCard, isPending: isVerifyingCard } = useVerifyCardMutation()
  const { mutateAsync: confirmCode, isPending: isConfirmingCode } = useCardConfirmCodeMutation()

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null
    if (isOtpMode && otpTimeout > 0) {
      timer = setTimeout(() => setOtpTimeout(otpTimeout - 1), 1000)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [otpTimeout, isOtpMode])

  const startCardVerification = async (cardData: ICard) => {
    const response = await verifyCard({ card_id: cardData.id })
    const verifyData = response.data as IVerifyCard
    setVerifiedPhone(verifyData.result.phone)
    setSelectedCardId(cardData.id)
    setIsOtpMode(true)
    setOtpTimeout(60)
  }

  const handleAddCard = async () => {
    const { cardNumber, cardExpires } = cardDetails

    if (cardNumber.length && cardExpires.length) {
      const cardResponse = await addCard({
        number: cardNumber.split(' ').join(''),
        expire: cardExpires.split('/').join(''),
      })

      if (cardResponse.status === 'success') {
        toast.success('Sms kod yuborildi!')
        startCardVerification(cardResponse.data as ICard)
      } else {
        const cardError = cardResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleConfirmCode = async () => {
    const { otp } = cardDetails

    if (otp.length > 5) {
      const confirmResponse = await confirmCode({
        card_id: selectedCardId as number,
        code: otp.split(' ').join(''),
      })

      if (confirmResponse.status === 'success') {
        toast.success("Karta muvaqqiyatli qo'shildi")
        handleCloseModal()
        refetchCards()
      } else {
        const cardError = confirmResponse.data as ICardError
        toast.error(cardError.uz || cardError.error.message)
      }
    }
  }

  const handleCloseModal = () => {
    setIsOtpMode(false)
    setCardDetails(initialCardDetails)
    setOtpTimeout(60)
    setVerifiedPhone(null)
    setIsOpenModal(false)
  }

  const buttonText = isAddingCard
    ? 'Karta tekshirilmoqda...'
    : isConfirmingCode
      ? 'Sms kod tekshirilmoqda...'
      : isOtpMode
        ? 'SMS kodni tasdiqlash'
        : "Karta qo'shish"

  return (
    <Modal
      onSubmit={isOtpMode ? handleConfirmCode : handleAddCard}
      onClose={handleCloseModal}
      isOpen={isOpenModal}
      disabled={isAddingCard || isConfirmingCode || (isOtpMode && otpTimeout === 0)}
      buttonText={buttonText}
    >
      <h4 className="text-center">{isOtpMode ? 'Kartani tasdiqlash' : 'Karta qo’shish'}</h4>
      <div className="mt-2">
        {isOtpMode ? (
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
              onChange={inputHandler(setCardDetails)}
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
              onChange={inputHandler(setCardDetails)}
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
              onChange={inputHandler(setCardDetails)}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}

export default CardActionModal
