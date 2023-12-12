'use client'

import React, { FC, useState } from 'react'
import clsx from 'clsx'
import { CashIcon, CloseCircleRedIcon, PlasticCardIcon, PlusCircleGrayIcon } from '@/assets/icons'

type RadioType = `address` | `cash` | `plastic`

export type SwitchableRadioType = {
  key: number
  title: string
  type: RadioType
}

interface ISwitchableRadioProps {
  items: SwitchableRadioType[]
  selectedCardId: number
  isEditMode: boolean
  setSelectedCardId: (id: number) => void
  onAddAction: () => void
  onDeleteItemAction: () => void
}

const SwitchableRadio: FC<ISwitchableRadioProps> = ({
  items,
  setSelectedCardId,
  isEditMode,
  onAddAction,
  onDeleteItemAction,
}) => {
  const [activeItem, setActiveItem] = useState<number>(items[0]?.key)

  const handleSelect = (key: number) => {
    setActiveItem(key)
    setSelectedCardId(key)
  }

  const iconForType = (type: RadioType) => {
    switch (type) {
      case 'cash':
        return <CashIcon />
      case 'plastic':
        return <PlasticCardIcon />
      default:
        return isEditMode ? <CloseCircleRedIcon /> : <PlasticCardIcon />
    }
  }

  const getElementClassNames = (key: number) =>
    clsx(
      'w-full h-[50px] flex items-center justify-between px-5 rounded-xl cursor-pointer transition-colors duration-300 ease-in-out',
      {
        'bg-green-primary/20': activeItem === key,
      },
    )

  const getRoundIndicatorClassNames = (key: number) =>
    clsx('w-[22px] h-[22px] rounded-full transition-colors duration-300 ease-in-out', {
      'border-2 border-white bg-green-primary': activeItem === key,
      'border-2 border-[#C4C4C4]': activeItem !== key,
    })

  return (
    <div className="w-[360px] flex flex-col">
      {items.map(({ title, type, key }) => (
        <div key={key} className={getElementClassNames(key)} onClick={() => handleSelect(key)}>
          <div className="flex items-center gap-[13px]">
            <span className={getRoundIndicatorClassNames(key)}></span>
            <h6 className="text-base">{title}</h6>
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
        <p className="text-gray-primary">Karta qo'shish</p>
      </button>
    </div>
  )
}

export default SwitchableRadio
