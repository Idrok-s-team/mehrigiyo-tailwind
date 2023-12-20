'use client'

import React, { FC, useEffect, useState } from 'react'
import clsx from 'clsx'
import { CloseCircleRedIcon, PlasticCardIcon, PlusCircleGrayIcon, SwitchableRightIcon } from '@/assets/icons'
import { useShopStore } from '@/store'

type RadioType = `address` | `plastic`

export type SwitchableRadioType = {
  key: number
  title: string
  description?: string
  type: RadioType
  data?: any
}

interface ISwitchableRadioProps {
  items: SwitchableRadioType[]
  isEditMode?: boolean
  onAddAction: () => void
  onDeleteItemAction?: () => void
  isAddressMode?: boolean
}

const SwitchableRadio: FC<ISwitchableRadioProps> = ({
  items,
  onAddAction,
  onDeleteItemAction,
  isEditMode = false,
  isAddressMode = false,
}) => {
  const [activeItem, setActiveItem] = useState<number>(items[0]?.key)
  const { selectedAddress, setSelectedAddress, setSelectedPaymentCard, selectedPaymentCard } = useShopStore()

  useEffect(() => {
    if (items.length > 0) {
      if (isAddressMode && !selectedAddress) {
        setSelectedAddress(items[0].data)
        setActiveItem(items[0].key)
      } else if (!isAddressMode && !selectedPaymentCard) {
        setSelectedPaymentCard(items[0].data)
        setActiveItem(items[0].key)
      }
    }
  }, [items, selectedAddress, selectedPaymentCard])

  const handleSelect = (key: number, data: any, type: RadioType) => {
    setActiveItem(key)
    type === 'address' ? setSelectedAddress(data) : setSelectedPaymentCard(data)
  }

  const getIconForType = (type: RadioType) => {
    if (isEditMode) {
      return <CloseCircleRedIcon />
    }
    return type === 'plastic' ? <PlasticCardIcon /> : <SwitchableRightIcon />
  }

  const getElementClassNames = (key: number) =>
    clsx(
      'w-full h-[50px] flex items-center justify-between px-5 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out',
      {
        'bg-green-primary/20': activeItem === key,
        '!h-[68px]': isAddressMode,
      },
    )

  const getRoundIndicatorClassNames = (key: number) =>
    clsx('w-[22px] h-[22px] rounded-full transition-colors duration-300 ease-in-out', {
      'border-2 border-white bg-green-primary': activeItem === key,
      'border-2 border-[#C4C4C4]': activeItem !== key,
    })

  const renderItem = ({ title, type, key, description, data }: SwitchableRadioType) => (
    <div key={key} className={getElementClassNames(key)} onClick={() => handleSelect(key, data, type)}>
      <div className="flex items-center gap-[13px]">
        <span className={getRoundIndicatorClassNames(key)}></span>
        <div>
          <h6 className="text-base">{title}</h6>
          {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
        </div>
      </div>
      <div className="animate-fade-in" onClick={isEditMode ? onDeleteItemAction : undefined}>
        {getIconForType(type)}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col w-full">
      {items.map(renderItem)}
      <button
        className="w-full h-[50px] flex items-center px-5 gap-[13px] bg-gray-primary/10 rounded-xl"
        onClick={onAddAction}
      >
        <span>
          <PlusCircleGrayIcon />
        </span>
        <p className="text-gray-primary">{isAddressMode ? "Manzil qo'shish" : "Karta qo'shish"}</p>
      </button>
    </div>
  )
}

export default SwitchableRadio
