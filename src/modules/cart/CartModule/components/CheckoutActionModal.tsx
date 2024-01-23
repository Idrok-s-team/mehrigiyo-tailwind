import React, { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Modal, SwitchableRadio } from '@/components/common'
import { useAddShopCheckoutMutation, useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { useShopCartQuery } from '@/hooks/queries'
import { usePaymentMethods, useUserAddresses } from '@/hooks/checkout'
import { SuccessfulCheckoutIcon, UnsuccessfulCheckoutIcon } from '@/assets/icons'
import { useAuthStore, useCommonStore, useShopStore } from '@/store'
import { ROUTES } from '@/constants'

const CheckoutActionModal: FC = () => {
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'success' | 'fail'>('idle')
  const router = useRouter()
  const { selectedAddress, selectedPaymentCard } = useShopStore()
  const { activeModal, setActiveModal } = useCommonStore()
  const { isUserRegistered } = useAuthStore()

  const { data: cartData, refetch } = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const { mutateAsync: addCheckout, isPending: addCheckoutPending } = useAddShopCheckoutMutation()
  const { mutateAsync: updateCheckout, isPending: updateCheckoutPending } = useUpdateShopCheckoutMutation()
  const { paymentMethods } = usePaymentMethods()
  const { addressData } = useUserAddresses()

  useEffect(() => {
    setActiveModal(null)
    refetch()
  }, [])

  const handleCheckout = async () => {
    const cartProductIds = cartData?.data.map((item) => item.id)
    const addCheckoutResponse = await addCheckout({ list: cartProductIds?.toString() as string })
    const updateCheckoutResponse = await updateCheckout({
      id: addCheckoutResponse.data.id,
      credit_card: selectedPaymentCard?.id,
      shipping_address: selectedAddress?.id as any,
    })

    if (updateCheckoutResponse.status === 'success') {
      setCheckoutStatus('success')
      toast.success('Buyurtma muvaffaqiyatli tasdiqlandi!')
    } else {
      setCheckoutStatus('fail')
      toast.error("Nimadur xato bo'ldi, iltimos qayta urinib ko'ring")
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const closeModal = () => {
    setActiveModal(null)
    setCheckoutStatus('idle')
    refetch()
  }

  const handleSubmit = () => {
    if (checkoutStatus === 'success') {
      navigateTo(ROUTES.DASHBOARD_ORDERS)
    } else if (checkoutStatus === 'fail') {
      setCheckoutStatus('idle')
    } else {
      handleCheckout()
    }
  }

  const checkoutFormContent = () => (
    <>
      <h4 className="text-center">Buyurtma</h4>
      <div className="mt-3 flex flex-col gap-8 max-h-[50vh] overflow-auto">
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">Yetkazib berish manzili</h6>
          <SwitchableRadio
            isAddressMode
            items={addressData}
            onAddAction={() => navigateTo(ROUTES.DASHBOARD_DELIVERY_ADDRESS)}
          />
        </section>
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">To'lov turi</h6>
          <SwitchableRadio items={paymentMethods} onAddAction={() => navigateTo(ROUTES.DASHBOARD_PAYMENT_METHODS)} />
        </section>
      </div>
    </>
  )

  const checkoutSuccessContent = () => (
    <div className="flex flex-col items-center">
      <div className="mr-10">
        <SuccessfulCheckoutIcon />
      </div>
      <h4 className="mt-12">Buyurtmangiz qabul qilindi</h4>
      <p className="text-[#7C7C7C]">Tez orada sizga bog'lanamiz!</p>
    </div>
  )

  const checkoutFailContent = () => (
    <div className="flex flex-col items-center">
      <div className="mr-10">
        <UnsuccessfulCheckoutIcon />
      </div>
      <h4 className="mt-12">To'lov qabul qilinmadi</h4>
      <p className="text-[#7C7C7C]">Nimadur noto'g'ri ketdi!</p>
    </div>
  )

  const renderContent = () => {
    switch (checkoutStatus) {
      case 'success':
        return checkoutSuccessContent()
      case 'fail':
        return checkoutFailContent()
      default:
        return checkoutFormContent()
    }
  }

  const getButtonText = () => {
    if (checkoutStatus === 'success') return "Buyurtmalarga o'tish"
    if (checkoutStatus === 'fail') return "Qayta urinib ko'rish"
    if (addCheckoutPending) return "To'lov tekshirilmoqda..."
    return "To'lov qilish"
  }

  return (
    <Modal
      onSubmit={handleSubmit}
      onClose={closeModal}
      isOpen={activeModal === 'cart'}
      className="w-[446px] px-10 max-xs:w-full max-xs:px-3"
      disabled={addCheckoutPending || updateCheckoutPending}
      closeText="Chiqish"
      buttonText={getButtonText()}
    >
      {renderContent()}
    </Modal>
  )
}

export default CheckoutActionModal
