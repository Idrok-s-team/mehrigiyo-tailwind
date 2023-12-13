'use client'

import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { CashIcon, CloseCircleRedIcon, PlasticCardIcon, PlusCircleGrayIcon, SwitchableRightIcon } from '@/assets/icons'

type RadioType = `address` | `cash` | `plastic`

export type SwitchableRadioType = {
  key: number
  title: string
  description?: string
  type: RadioType
}

interface ISwitchableRadioProps {
  items: SwitchableRadioType[]
  isEditMode: boolean
  setSelectedItemId: (id: number) => void
  onAddAction: () => void
  onDeleteItemAction: () => void
  isAddressMode?: boolean
}

const SwitchableRadio: FC<ISwitchableRadioProps> = ({
  items,
  setSelectedItemId,
  isEditMode,
  onAddAction,
  onDeleteItemAction,
  isAddressMode = false,
}) => {
  const [activeItem, setActiveItem] = useState<number>(items[0]?.key)

  const handleSelect = (key: number) => {
    setActiveItem(key)
    setSelectedItemId(key)
  }

  const iconForType = (type: RadioType) => {
    if (isEditMode && (type === 'address' || type === 'plastic')) {
      return <CloseCircleRedIcon />
    }
    switch (type) {
      case 'cash':
        return <CashIcon />
      case 'plastic':
        return <PlasticCardIcon />
      case 'address':
        return <SwitchableRightIcon />
      default:
        return <PlasticCardIcon />
    }
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

  return (
    <div className="w-[360px] flex flex-col">
      {items.map(({ title, type, key, description }) => (
        <div key={key} className={getElementClassNames(key)} onClick={() => handleSelect(key)}>
          <div className="flex items-center gap-[13px]">
            <span className={getRoundIndicatorClassNames(key)}></span>
            <div>
              <h6 className="text-base">{title}</h6>
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          </div>
          <div className="animate-fade-in" onClick={isEditMode ? onDeleteItemAction : undefined}>
            {iconForType(type)}
          </div>
        </div>
      ))}
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
