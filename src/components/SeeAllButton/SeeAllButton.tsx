'use client'

import { type FC, memo } from 'react'
import clsx from 'clsx'
import { ArrowRightIcon } from '@/assets/icons'
import { ElementSizeType } from '@/types'

interface IProps {
  text: string
  size?: ElementSizeType
  className?: string
}

export const SeeAllButton: FC<IProps> = ({ text, size = 'lg', className }: IProps) => {
  const classNames = clsx(
    'flex items-center gap-4 py-3 px-6 rounded-[30px] bg-green-light duration-300 transition-colors hover:border-[0.5px] hover:border-green-primary group',
    {
      'h-9': size === 'sm',
      'h-11': size === 'md',
      'h-[50px]': size === 'lg',
    },
    className,
  )
  return (
    <button className={classNames}>
      <span>{text}</span>
      <span className="group-hover:translate-x-1 duration-200">
        <ArrowRightIcon />
      </span>
    </button>
  )
}
