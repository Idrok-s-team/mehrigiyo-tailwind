'use client'

import { type FC, ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

const ActionButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F0F0F0]" {...props}>
      {children}
    </button>
  )
}

export default ActionButton
