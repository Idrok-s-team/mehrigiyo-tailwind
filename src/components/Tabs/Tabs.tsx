'use client'

import { FC, useState, useCallback, ReactNode } from 'react'

export type TabItemType = {
  key: string
  label: string
  children?: ReactNode
}

type Props = {
  items: TabItemType[]
  onTabChange?: (key: string) => void
}

const Tabs: FC<Props> = ({ items, onTabChange }): JSX.Element => {
  const [activeTab, setActiveTab] = useState(items[0].key)

  const handleTabClick = useCallback(
    (key: string) => {
      setActiveTab(key)
      if (onTabChange) {
        onTabChange(key)
      }
    },
    [onTabChange],
  )

  const activeTabItem = items.find((item) => item.key === activeTab)
  const tabWidth = `${100 / items.length}%`

  return (
    <>
      <div className="h-[50px] px-2  rounded-[100px] flex items-center bg-black/[0.03]">
        <ul className="w-full h-9 flex items-center" role="tablist">
          {items.map(({ key, label }) => (
            <li
              key={key}
              className={`h-full px-[23px] py-[7px] flex items-center justify-center rounded-[100px] text-gray-primary cursor-pointer select-none duration-200 whitespace-nowrap ${
                key === activeTab ? 'bg-green-primary/20 text-green-primary font-semibold' : ''
              }`}
              onClick={() => handleTabClick(key)}
              role="tab"
              tabIndex={key === activeTab ? 0 : -1}
              aria-selected={key === activeTab}
              style={{ width: tabWidth }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="py-4">{activeTabItem?.children}</div>
    </>
  )
}

export default Tabs
