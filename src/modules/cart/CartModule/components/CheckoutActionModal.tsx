import React, { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Modal, SwitchableRadio } from '@/components'
import { useAddShopCheckoutMutation, useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { useShopCartQuery } from '@/hooks/queries'
import { usePaymentMethods, useUserAddresses } from '@/hooks/checkout'
import { SuccessfulCheckoutIcon, UnsuccessfulCheckoutIcon } from '@/assets/icons'

interface ICardActionModal {
  isOpenModal: boolean
  setIsOpenModal: (modal: boolean) => void
}

const CheckoutActionModal: FC<ICardActionModal> = ({ isOpenModal, setIsOpenModal }) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [isSuccessMode, setIsSuccessMode] = useState(false)
  const [isFailMode, setIsFailMode] = useState(false)

  const router = useRouter()

  const { data, refetch } = useShopCartQuery()
  const { mutateAsync: addCheckout, isPending: addCheckoutPending } = useAddShopCheckoutMutation()
  const { mutateAsync: updateCheckout, isPending: updateCheckoutPending } = useUpdateShopCheckoutMutation()

  const { paymentMethods, isPaymentSuccess, refetchPayments } = usePaymentMethods()
  const { addressData, isAddressSuccess, refetchAddresses } = useUserAddresses()

  const handleAddCheckout = async () => {
    const cartProductIds = data?.data.map((item) => item.id)
    const addCheckoutResponse = await addCheckout({ list: cartProductIds?.toString() as string })
    const updateCheckoutResponse = await updateCheckout({
      id: addCheckoutResponse.data.id,
      credit_card: selectedPaymentId as number,
      shipping_address: selectedAddressId as number,
    })

    if (updateCheckoutResponse.status === 'success') {
      setIsSuccessMode(true)
      toast.success('Buyurtma muvaffaqiyatli tasdiqlandi!')
      refetch()
    } else {
      setIsFailMode(true)
      toast.error("Nimadur xato bo'ldi, iltimos qayta urinib ko'ring")
      refetch()
    }
  }

  const handleMoveOrders = () => {
    router.push('/dashboard/orders')
  }

  const handleTryAgain = () => {
    setIsSuccessMode(false)
    setIsFailMode(false)
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
    setIsSuccessMode(false)
    setIsFailMode(false)
  }

  const onAddressAction = () => {
    router.push('/dashboard/delivery-address')
  }

  const onAddPaymentAction = () => {
    router.push('/dashboard/payment-methods')
  }

  const renderModalContent = () => (
    <>
      <h4 className="text-center">Buyurtma</h4>
      <div className="mt-3 flex flex-col gap-8 max-h-[50vh] overflow-auto">
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">Yetkazib berish manzili</h6>
          <SwitchableRadio
            isAddressMode
            items={addressData}
            selectedItemId={selectedAddressId as number}
            setSelectedItemId={setSelectedAddressId}
            isEditMode={isEditMode}
            onAddAction={onAddressAction}
          />
        </section>
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">To'lov turi</h6>
          <SwitchableRadio
            items={paymentMethods}
            selectedItemId={selectedPaymentId as number}
            setSelectedItemId={setSelectedPaymentId}
            isEditMode={isEditMode}
            onAddAction={onAddPaymentAction}
          />
        </section>
      </div>
    </>
  )

  const renderSuccessContent = () => (
    <div className="flex flex-col items-center">
      <div className="mr-10">
        <SuccessfulCheckoutIcon />
      </div>
      <h4 className="mt-12">Buyurtmangiz qabul qilindi</h4>
      <p className="text-[#7C7C7C]">Tez orada sizga bog'lanamiz</p>
    </div>
  )

  const renderFailModeContent = () => (
    <div className="flex flex-col items-center">
      <div className="mr-10">
        <UnsuccessfulCheckoutIcon />
      </div>
      <h4 className="mt-12">Buyurtmangiz qabul qilindi</h4>
      <p className="text-[#7C7C7C]">Tez orada sizga bog'lanamiz</p>
    </div>
  )

  return (
    <Modal
      onSubmit={isSuccessMode ? handleMoveOrders : isFailMode ? handleTryAgain : handleAddCheckout}
      onClose={handleCloseModal}
      isOpen={isOpenModal}
      className="w-[446px] px-10"
      disabled={addCheckoutPending || updateCheckoutPending}
      closeText="Chiqish"
      buttonText={
        isSuccessMode
          ? "Buyurtmalarga o'tish"
          : isFailMode
            ? "Qayta urinib ko'rish"
            : addCheckoutPending || updateCheckoutPending
              ? "To'lov tekshirilmoqda..."
              : "To'lov qilish"
      }
    >
      {isSuccessMode ? renderSuccessContent() : isFailMode ? renderFailModeContent() : renderModalContent()}
    </Modal>
  )
}

export default CheckoutActionModal
