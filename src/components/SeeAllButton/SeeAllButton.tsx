'use client'

import { type FC, memo, ReactNode } from 'react'
import clsx from 'clsx'
import { ArrowRightIcon } from '@/assets/icons'
import { ElementSizeType } from '@/types'

type Props = {
  text: string
  size?: ElementSizeType
  className?: string
  icon?: ReactNode
}

const SeeAllButton: FC<Props> = ({ text, size = 'lg', className, icon = <ArrowRightIcon /> }) => {
  const classNames = clsx(
    'flex items-center justify-between gap-4 py-3 px-6 rounded-[30px] bg-green-light duration-300 transition-colors hover:border-[0.5px] hover:border-green-primary group',
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
      <span className="group-hover:translate-x-1 duration-200">{icon}</span>
    </button>
  )
}

export default SeeAllButton
