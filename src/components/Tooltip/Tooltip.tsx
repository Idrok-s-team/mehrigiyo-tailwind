'use client'

import React, { FC, ReactNode, useRef, useState, MouseEvent } from 'react'

type TooltipProps = {
  children: ReactNode
  text: string
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [show, setShow] = useState(false)
  const [arrowPosition, setArrowPosition] = useState<string>('50%')
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (tooltipRef.current) {
      const bounds = tooltipRef.current.getBoundingClientRect()
      const position = ((e.clientX - bounds.left) / bounds.width) * 100
      setArrowPosition(`${Math.min(Math.max(position, 10), 90)}%`)
    }
  }

  return (
    <div className="relative flex items-center w-auto">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMouseMove}
        className="w-full"
      >
        {children}
      </div>

      {show && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-gray-700 text-white text-sm rounded-md shadow-lg animate-fade-in whitespace-nowrap"
        >
          {text}
          <span
            style={{ left: arrowPosition }}
            className="absolute rotate-180 -translate-x-1/2 -translate-y-1 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-700"
          ></span>
        </div>
      )}
    </div>
  )
}

export default Tooltip
