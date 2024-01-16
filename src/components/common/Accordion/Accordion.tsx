'use client'

import { FC, useState, useRef, useEffect, memo, ReactNode } from 'react'
import { DropdownIcon } from '@/assets/icons'
import { cleanHtml } from '@/utils'

interface IChildren {
  title: string
  children: ReactNode
}

interface IAccordionProps {
  items: IChildren[]
  withIndex?: boolean
  size?: 'sm' | 'md'
  isFirstItemOpened?: boolean
}

const Accordion: FC<IAccordionProps> = memo(function Accordion({
  items,
  withIndex = true,
  isFirstItemOpened = false,
  size = 'md',
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const contentRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length)

    if (isFirstItemOpened) {
      setActiveIndex(0)
    }
  }, [isFirstItemOpened, items])

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }
  const smallSize = size === 'sm'

  return (
    <div className="flex flex-col w-full transition-transform">
      {items.map(({ title, children }, index) => (
        <div
          key={title}
          className={`${index !== 0 ? 'border-t-2' : ''} ${smallSize ? '!border-t' : ''} border-[#ECECF1] py-5`}
        >
          <button
            className="flex items-center justify-between w-full rounded-md cursor-pointer"
            onClick={() => toggleItem(index)}
          >
            <div className="flex items-center gap-5">
              {withIndex && <h4 className="font-medium text-green-primary">0{index + 1}</h4>}
              <h5 className={`font-medium ${smallSize ? 'text-base' : ''}`}>{title}</h5>
            </div>
            {children && (
              <span className={`${activeIndex === index ? '' : '-rotate-90'} duration-300`}>
                <DropdownIcon />
              </span>
            )}
          </button>

          <div
            ref={(el) => (contentRefs.current[index] = el!)}
            className="overflow-hidden duration-300 ease-in-out transition-max-height"
            style={{
              maxHeight: activeIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0',
            }}
          >
            {children}
            {/* <ul className={`flex flex-col ${smallSize ? '' : 'ml-12'}`}>
              <li>
                <p
                  className={`text-gray-primary ${smallSize ? 'text-sm mt-3' : ''}`}
                  dangerouslySetInnerHTML={{ __html: cleanHtml(String(children).replace(/\n/g, '<br>')) }}
                />
              </li>
            </ul> */}
          </div>
        </div>
      ))}
    </div>
  )
})

export default Accordion
