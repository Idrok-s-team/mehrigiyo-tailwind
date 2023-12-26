'use client'

import React, { FC, ReactNode, useState } from 'react'

type TooltipProps = {
  children: ReactNode
  text: string
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [show, setShow] = useState(false)

  return (
    <div className="relative flex items-center w-auto">
      <div className='w-full' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-[20%] mb-1 px-2 py-1 bg-gray-700 text-white text-sm rounded-md shadow-lg animate-fade-in whitespace-nowrap">
          {text}
          <span className="absolute right-[82%] rotate-180 -translate-x-1/2 -translate-y-1 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-gray-700"></span>
        </div>
      )}
    </div>
  )
}

export default Tooltip
