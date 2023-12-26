'use client'

import clsx from 'clsx'
import { type FC, ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isHoverable?: boolean
}

const ActionButton: FC<Props> = ({ children, isHoverable = false, ...props }) => {
  const classes = clsx('w-10 h-10 flex items-center justify-center rounded-full duration-300 ', {
    'hover:bg-[#F0F0F0]': isHoverable,
    'bg-[#F0F0F0]': !isHoverable,
  })
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}

export default ActionButton
