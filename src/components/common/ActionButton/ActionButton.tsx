'use client'

import { ElementSizeType } from '@/types'
import clsx from 'clsx'
import { type FC, ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  isHoverable?: boolean
  size?: ElementSizeType
}

const ActionButton: FC<Props> = ({ children, isHoverable = false, size = 'md', className, ...props }) => {
  const classes = clsx(
    'flex items-center justify-center rounded-full duration-300',
    {
      'hover:bg-[#F0F0F0]': isHoverable,
      'bg-[#F0F0F0]': !isHoverable,
      'w-12 h-12': size === 'lg',
      'w-10 h-10': size === 'md',
      'w-8 h-8': size === 'sm',
    },
    className,
  )
  return (
    <button {...props} type="button" className={classes}>
      {children}
    </button>
  )
}

export default ActionButton
