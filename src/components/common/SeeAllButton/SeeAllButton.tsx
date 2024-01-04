'use client'

import { type FC, ReactNode, ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { ArrowRightIcon } from '@/assets/icons'
import { ElementSizeType } from '@/types'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
  size?: ElementSizeType
  icon?: ReactNode
  href?: string
  useLink?: boolean
}

const SeeAllButton: FC<Props> = ({
  text,
  size = 'lg',
  className,
  icon = <ArrowRightIcon />,
  useLink = true,
  href = '/',
  ...props
}) => {
  const classNames = clsx(
    'flex items-center justify-between gap-4 py-3 px-6 rounded-[30px] bg-green-light duration-300 transition-colors hover:border-[0.5px] hover:border-green-primary group',
    {
      'h-9': size === 'sm',
      'h-11': size === 'md',
      'h-[50px]': size === 'lg',
      'opacity-50 cursor-not-allowed': props.disabled,
    },
    className,
  )
  return useLink ? (
    <Link href={href}>
      <button className={classNames} {...props}>
        <span className="whitespace-nowrap">{text}</span>
        {!props.disabled && <span className="duration-200 group-hover:translate-x-1">{icon}</span>}
      </button>
    </Link>
  ) : (
    <div>
      <button className={classNames} {...props}>
        <span className="whitespace-nowrap">{text}</span>
        {!props.disabled && <span className="duration-200 group-hover:translate-x-1">{icon}</span>}
      </button>
    </div>
  )
}

export default SeeAllButton
