import React, { FC } from 'react'
import { Modal } from '@/components/common'
import { DeliveryStatusMap } from '@/constants'
import { useCommonStore, useShopStore } from '@/store'
import clsx from 'clsx'
import { CashIcon, PlasticCardIcon } from '@/assets/icons'

interface IProps {}

const OrderDetailsModal: FC<IProps> = () => {
  const { selectedOrder } = useShopStore()
  const { activeModal, setActiveModal } = useCommonStore()

  const { id, shipping_address, cart_products, payment_type, delivery_status, price } = selectedOrder ?? {}

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  const statusClasses = clsx('px-9 py-1 text-sm font-semibold rounded-full', {
    'bg-[#FFC648]/10 text-[#FFC648]': delivery_status === 1,
    'bg-green-primary/10 text-green-primary': delivery_status === 2 || delivery_status === 3,
    'bg-[#F28B74]/10 text-[#F28B74]': delivery_status === 4,
  })

  return (
    <Modal onSubmit={() => {}} onClose={handleCloseModal} isOpen={activeModal === 'order'} withFooter={false}>
      <h4 className="text-center">Buyurtma tafsilotlari</h4>
      <div>
        <div className="mt-2 px-5 max-h-[50vh] overflow-auto">
          <section className="flex items-center justify-between">
            <p>Buyurtma&nbsp; #{id}</p>
            <div className={statusClasses}>{delivery_status ? DeliveryStatusMap[delivery_status] : ''}</div>
          </section>
          <section className="flex flex-col gap-2.5 mt-5">
            <div className="flex items-center justify-between">
              <p>Manzil</p>
              <p>{shipping_address?.full_address}</p>
            </div>
          </section>
          <p className="my-2.5 text-[#C3C3C3] text-sm">Mahsulotlar</p>
          <section className="flex flex-col gap-2.5">
            {cart_products?.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <p>{item.product.name}</p>
                <p>{item.get_total_price.toLocaleString('ru')} so'm</p>
              </div>
            ))}
          </section>
        </div>
        <section className="flex flex-col mt-8 gap-2.5">
          <div className="w-full h-[50px] flex items-center justify-between px-5 rounded-xl bg-gray-primary/10 text-green-primary">
            <h6>To'lov jami:</h6>
            <h6>{price?.toLocaleString('ru')} so'm</h6>
          </div>
          <div className="w-full h-[50px] flex items-center justify-between px-5 rounded-xl bg-green-primary/20">
            <div className="flex items-center gap-[13px]">
              <span className="w-[22px] h-[22px] rounded-full transition-colors duration-300 ease-in-out border-2 border-white bg-green-primary"></span>
              <div>
                <h6 className="text-base">{payment_type === 1 ? 'Naqd pul' : 'Plastik karta'}</h6>
              </div>
            </div>
            <div className="animate-fade-in">{payment_type === 1 ? <CashIcon /> : <PlasticCardIcon />}</div>
          </div>
        </section>
      </div>
    </Modal>
  )
}

export default OrderDetailsModal
