import React, { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Modal, SwitchableRadio } from '@/components'
import { useAddShopCheckoutMutation, useUpdateShopCheckoutMutation } from '@/hooks/mutations'
import { useShopCartQuery } from '@/hooks/queries'
import { usePaymentMethods, useUserAddresses } from '@/hooks/checkout'
import { SuccessfulCheckoutIcon, UnsuccessfulCheckoutIcon } from '@/assets/icons'
import { useCommonStore, useShopStore } from '@/store'

const CheckoutActionModal: FC = () => {
  const [checkoutStatus, setCheckoutStatus] = useState('idle')
  const { selectedAddress, selectedPaymentCard } = useShopStore()
  const router = useRouter()

  const { activeModal, setActiveModal } = useCommonStore()
  const { data: cartData, refetch } = useShopCartQuery()
  const { mutateAsync: addCheckout, isPending: addCheckoutPending } = useAddShopCheckoutMutation()
  const { mutateAsync: updateCheckout, isPending: updateCheckoutPending } = useUpdateShopCheckoutMutation()
  const { paymentMethods } = usePaymentMethods()
  const { addressData } = useUserAddresses()

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
      refetch()
    } else {
      setCheckoutStatus('fail')
      toast.error("Nimadur xato bo'ldi, iltimos qayta urinib ko'ring")
      refetch()
    }
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  const closeModal = () => {
    setActiveModal(null)
    setCheckoutStatus('idle')
  }

  const CheckoutFormContent = () => (
    <>
      <h4 className="text-center">Buyurtma</h4>
      <div className="mt-3 flex flex-col gap-8 max-h-[50vh] overflow-auto">
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">Yetkazib berish manzili</h6>
          <SwitchableRadio
            isAddressMode
            items={addressData}
            onAddAction={() => navigateTo('/dashboard/delivery-address')}
          />
        </section>
        <section className="flex flex-col">
          <h6 className="mb-3 text-start">To'lov turi</h6>
          <SwitchableRadio items={paymentMethods} onAddAction={() => navigateTo('/dashboard/payment-methods')} />
        </section>
      </div>
    </>
  )

  const CheckoutSuccessContent = () => (
    <div className="flex flex-col items-center">
      <div className="mr-10">
        <SuccessfulCheckoutIcon />
      </div>
      <h4 className="mt-12">Buyurtmangiz qabul qilindi</h4>
      <p className="text-[#7C7C7C]">Tez orada sizga bog'lanamiz!</p>
    </div>
  )

  const CheckoutFailContent = () => (
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
        return <CheckoutSuccessContent />
      case 'fail':
        return <CheckoutFailContent />
      default:
        return <CheckoutFormContent />
    }
  }

  return (
    <Modal
      onSubmit={checkoutStatus === 'success' ? () => navigateTo('/dashboard/orders') : handleCheckout}
      onClose={closeModal}
      isOpen={activeModal === 'cart'}
      className="w-[446px] px-10"
      disabled={addCheckoutPending || updateCheckoutPending}
      closeText="Chiqish"
      buttonText={
        checkoutStatus === 'success'
          ? "Buyurtmalarga o'tish"
          : checkoutStatus === 'success'
            ? "Qayta urinib ko'rish"
            : addCheckoutPending
              ? "To'lov tekshirilmoqda..."
              : "To'lov qilish"
      }
    >
      {renderContent()}
    </Modal>
  )
}

export default CheckoutActionModal
