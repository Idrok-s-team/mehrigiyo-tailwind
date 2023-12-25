import React, { FC, ReactNode } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useUserMeQuery } from '@/hooks/queries'
import { DeliveryStatusKey, IShopCheckout } from '@/types'
import {
  OrderChatIcon,
  OrderCloseIcon,
  OrderDoneIcon,
  OrderMapPathIcon,
  OrderOrangePointIcon,
  OrderProductIcon,
  OrderWhitePointIcon,
} from '@/assets/icons/dashboard/orders'
import backgroundMap from '@/assets/icons/dashboard/orders/backgroundMap.png'
import orderSandClock from '@/assets/icons/dashboard/orders/orderSandClock.svg'
import orderDeliverIcon from '@/assets/icons/dashboard/orders/orderDeliverIcon.svg'
import orderCarIcon from '@/assets/icons/dashboard/orders/orderCarIcon.svg'
import { useCommonStore, useShopStore } from '@/store'

interface IProps {
  orderData?: IShopCheckout
  statusType?: DeliveryStatusKey
}

interface StatusSectionProps {
  status: DeliveryStatusKey
  bgColor: string
  icon?: ReactNode
  img?: StaticImageData
  text: string
}

const OrderCard: FC<IProps> = ({ statusType = 'Pending', orderData }) => {
  const { updateShopState } = useShopStore()
  const { setActiveModal } = useCommonStore()
  const { data: userData } = useUserMeQuery()

  const handleSelectOrder = () => {
    if (orderData?.id) {
      updateShopState('selectedOrder', orderData)
      setActiveModal('order')
    }
  }

  const handleDeleteOrder = () => {
    if (orderData?.id) {
      updateShopState('selectedOrder', orderData)
      setActiveModal('order')
    }
  }

  const renderStatusSection = ({ status, bgColor, icon, img, text }: StatusSectionProps) => {
    const isDeliveredOrReturned = status === 'Delivered' || status === 'Returned'
    return (
      <section className={`w-[124px] p-4 h-full flex flex-col items-center justify-between ${bgColor}`}>
        {(status === 'Pending' || status === 'OnDelivery') && (
          <span className="flex items-center gap-1">
            <OrderOrangePointIcon />
            <OrderOrangePointIcon />
            <OrderOrangePointIcon />
            <OrderWhitePointIcon />
          </span>
        )}
        <span className={isDeliveredOrReturned ? 'mt-2 h-1/2 flex items-end' : ''}>
          {img && <Image src={img} alt="" />}
          <div className="scale-150"> {icon}</div>
        </span>
        <span className={`text-[10px] ${isDeliveredOrReturned ? 'mt-10 mb-2' : 'mb-1'} text-white text-center`}>
          {text}
        </span>
      </section>
    )
  }

  const renderUserAvatar = () => (
    <span className="absolute z-[1] top-1/3 left-5 border-[8px] rounded-2xl border-[#2C7747]/10">
      {/* <Image
        src={userData?.avatar as string}
        alt={`${userData?.first_name} ${userData?.last_name}`}
        width={32}
        height={32}
        className="rounded-[10px] "
      /> */}
    </span>
  )

  const renderChatAndCarIcon = () => (
    <div className="absolute z-[1] left-[36%] top-[27%]">
      <OrderChatIcon />
      <Image src={orderCarIcon} alt="" className="absolute top-[17%] left-[22%]" />
    </div>
  )

  const renderOrderDetails = () => (
    <div
      className={`flex items-center justify-between h-12 p-4 pr-6 bg-white ${
        statusType === 'Pending' ? 'invisible !bg-transparent' : ''
      }`}
    >
      <div>
        <p className="text-[#A8A8A8] text-[10px]">Taxminiy kelish</p>
        <h6 className="text-xs font-medium">3 kun</h6>
      </div>
      <div>
        <p className="text-[#A8A8A8] text-[10px]">Yetkazib beruvchi</p>
        <h6 className="text-xs font-medium">Sardor</h6>
      </div>
    </div>
  )

  return (
    <div className="w-[366px] h-[169px] flex rounded-3xl bg-[#F9FAFE] shadow-action-button overflow-hidden">
      <section className="cursor-pointer" onClick={handleSelectOrder}>
        {statusType === 'Pending' &&
          renderStatusSection({
            status: 'Pending',
            bgColor: 'bg-[#FFC648]',
            img: orderSandClock,
            text: 'Ko’rib chiqilmoqda',
          })}
        {statusType === 'OnDelivery' &&
          renderStatusSection({
            status: 'OnDelivery',
            bgColor: 'bg-green-primary',
            img: orderDeliverIcon,
            text: 'Yetkazib berish uchun chiqdi',
          })}
        {statusType === 'Delivered' &&
          renderStatusSection({
            status: 'Delivered',
            bgColor: 'bg-green-primary',
            icon: <OrderDoneIcon />,
            text: 'Yetkazib berildi',
          })}
        {statusType === 'Returned' &&
          renderStatusSection({
            status: 'Returned',
            bgColor: 'bg-[#F28B74]',
            icon: <OrderCloseIcon />,
            text: 'Bekor qilindi',
          })}
      </section>

      <section className="flex flex-col flex-1">
        <div className="relative flex-1">
          <Image src={backgroundMap} alt="" className="absolute bottom-0 h-full" />
          {renderUserAvatar()}
          <span className="absolute z-[1] left-[29%] top-[55%]">
            <OrderMapPathIcon />
          </span>
          {(statusType === 'Pending' || statusType === 'OnDelivery') && renderChatAndCarIcon()}
          <span className="absolute z-[1] right-[16%] bottom-[4%]">
            <OrderProductIcon />
          </span>
          {statusType === 'Pending' && (
            <button className="absolute z-[2] right-3 top-3" onClick={handleDeleteOrder}>
              <OrderCloseIcon />
            </button>
          )}
        </div>
        {renderOrderDetails()}
      </section>
    </div>
  )
}

export default OrderCard
