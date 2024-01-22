'use client'

import { FC, useState, useCallback, ReactNode } from 'react'
import clsx from 'clsx'

export type TabItemType = {
  key: string
  label: string
  children?: ReactNode
}

type Props = {
  items: TabItemType[]
  onTabChange?: (key: string) => void
  className?: string
  fullWidth?: boolean
  tabContainerWidth?: string
}

const Tabs: FC<Props> = ({ items, onTabChange, className, fullWidth = true, tabContainerWidth }): JSX.Element => {
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
  const tabWidth = fullWidth ? `${100 / items.length}%` : undefined

  const tabContainerClasses = clsx(
    'h-[50px] px-2 flex items-center bg-black/[0.03]',
    {
      'rounded-2xl': !fullWidth,
      'rounded-[100px]': fullWidth,
    },
    className,
    tabContainerWidth,
  )

  const getTabItemClasses = (key: string) => {
    const tabItemClasses = clsx(
      'h-full px-[23px] py-[7px] flex items-center justify-center text-gray-primary cursor-pointer select-none duration-200 whitespace-nowrap',
      {
        'bg-green-primary/20 text-green-primary font-semibold': key === activeTab,
        'rounded-[10px]': !fullWidth,
        'rounded-[100px]': fullWidth,
      },
    )
    return tabItemClasses
  }

  return (
    <>
      <div className={tabContainerClasses}>
        <ul className="w-full h-9 flex items-center overflow-x-auto no-scrollbar" role="tablist">
          {items.map(({ key, label }) => (
            <li
              key={key}
              className={getTabItemClasses(key)}
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
      {activeTabItem?.children && <div className="py-4">{activeTabItem?.children}</div>}
    </>
  )
}

export default Tabs
