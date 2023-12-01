'use client'

import { type FC, useState, useRef, memo, ReactNode } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { DropdownIcon } from '@/assets/icons'
import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ItemProps {
  id: string
  label: ReactNode
  selected?: boolean
  path?: string
}

interface IProps {
  items: ItemProps[]
  className?: string
  linkable?: boolean
}

const Dropdown: FC<IProps> = function Dropdown({ items, linkable }: IProps) {
  const initialSelected = items.find((item) => item.selected) || items[0]

  const [open, setOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(initialSelected)
  const ref = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<number | null>(null)
  const pathname = usePathname()

  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  const handleSelectItem = (item: ItemProps) => {
    if (!linkable) {
      setSelectedItem(item)
    }
    setOpen(false)
  }

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = window.setTimeout(() => setOpen(true), 200)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = window.setTimeout(() => setOpen(false), 200)
  }

  return (
    <div
      className="relative w-full h-full text-sm"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        id="dropdownHoverButton"
        data-dropdown-toggle="dropdownHover"
        data-dropdown-trigger="hover"
        className="flex items-center justify-between h-full px-2 text-center rounded-lg focus:outline-none"
        type="button"
      >
        <span className="mr-2">{selectedItem?.label}</span>
        <DropdownIcon width={10} height={10} />
      </button>
      {open && (
        <div className="absolute z-10 flex flex-col py-1 bg-white rounded-lg shadow top-6 animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.path || ''}
              onClick={() => handleSelectItem(item)}
              className={`p-3 py-2 hover:bg-green-light whitespace-nowrap text-start ${
                pathname === item.path ? 'font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
