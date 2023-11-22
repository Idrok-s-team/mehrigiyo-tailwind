'use client'

import { FC, useState, useCallback } from 'react'

export type TabItemType = {
  key: number | string
  label: string
}

type Props = {
  items: TabItemType[]
}

const Tabs: FC<Props> = ({ items }): JSX.Element => {
  const [activeTab, setActiveTab] = useState(items[0].key)

  const handleTabClick = useCallback((key: number | string) => {
    setActiveTab(key)
  }, [])

  return (
    <div className="h-[50px] px-4 py-[7px] shadow-primary rounded-2xl flex items-center">
      <ul className="h-9 flex items-center" role="tablist">
        {items.map(({ key, label }) => (
          <li
            key={key}
            className={`h-full px-[23px] py-[7px] flex items-center rounded-[10px] text-gray-primary cursor-pointer select-none duration-200 ${
              key === activeTab ? 'bg-green-primary/20 text-green-primary font-semibold' : ''
            }`}
            onClick={() => handleTabClick(key)}
            role="tab"
            tabIndex={key === activeTab ? 0 : -1}
            aria-selected={key === activeTab}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Tabs
