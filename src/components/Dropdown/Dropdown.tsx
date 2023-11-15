'use client'

import { type FC, useState, useRef, memo, ReactNode } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export interface ItemProps {
  id: string
  label: ReactNode
  selected?: boolean
}

interface IProps {
  items: ItemProps[]
  className?: string
}

export const Dropdown: FC<IProps> = memo(function Dropdown({ items }: IProps) {
  const initialSelected = items.find((item) => item.selected) || items[0]

  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(initialSelected)
  const ref = useRef<HTMLDivElement>(null)

  useOnClickOutside(ref, () => {
    setOpen(false)
  })

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleSelectItem = (item: ItemProps) => {
    setSelectedItem(item)
    setOpen(false)
  }

  return (
    <div className="relative w-full h-full text-sm" ref={ref}>
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="flex items-center justify-between  h-full px-2 text-center rounded-lg focus:outline-none"
        type="button"
        onClick={handleToggle}
      >
        <span className="mr-2">{selectedItem?.label}</span>
        <svg
          className="w-2.5 h-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col absolute min-w-full z-10 bg-white rounded-lg shadow">
          {items.map((item) => (
            <button key={item.id} onClick={() => handleSelectItem(item)} className="py-1 hover:bg-green-light">
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
})
