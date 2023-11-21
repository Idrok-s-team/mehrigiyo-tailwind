'use client'

import { FC, useState, useRef, useEffect, memo } from 'react'
import { DropdownIcon } from '@/assets/icons'

interface IChildren {
  title: string
  children: string
}

interface IAccordionProps {
  items: IChildren[]
}

const Accordion: FC<IAccordionProps> = memo(function Accordion({ items }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const contentRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    contentRefs.current = contentRefs.current.slice(0, items.length)
  }, [items])

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="flex flex-col w-full transition-transform">
      {items.map(({ title, children }, index) => (
        <div key={title} className={`${index !== 0 ? 'border-t-2' : ''} border-[#ECECF1] py-5` }>
          <button
            className="flex items-center justify-between w-full rounded-md cursor-pointer"
            onClick={() => toggleItem(index)}
          >
            <div className="flex items-center gap-5">
              <h4 className="font-medium text-green-primary">0{index + 1}</h4>
              <h5 className="font-medium">{title}</h5>
            </div>
            <span className={`${activeIndex === index ? '' : '-rotate-90'} duration-300`}>
              <DropdownIcon />
            </span>
          </button>

          <div
            ref={(el) => (contentRefs.current[index] = el!)}
            className="transition-max-height duration-300 ease-in-out overflow-hidden"
            style={{
              maxHeight: activeIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '0',
            }}
          >
            <ul className="flex flex-col ml-12">
              <li>
                <p className="text-gray-primary">{children}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
})

export default Accordion
