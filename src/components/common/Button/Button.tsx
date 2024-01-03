'use client'

import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import { ElementSizeType } from '@/types'

type ButtonType = 'primary' | 'secondary'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ElementSizeType
  buttonType?: ButtonType
}

const Button: FC<Props> = ({ children, type = 'button', buttonType = 'primary', className, size = 'md', ...props }) => {
  const classNames = clsx(
    'flex items-center justify-center w-full gap-4 py-3 px-6 rounded-[60px] whitespace-nowrap duration-300',
    {
      'h-9': size === 'sm',
      'h-11': size === 'md',
      'h-[50px]': size === 'lg',
      'bg-green-primary text-white hover:shadow-primary': buttonType === 'primary',
      'bg-gray-primary/20 hover:shadow-image': buttonType === 'secondary',
      'opacity-50 cursor-not-allowed': props.disabled,
    },
    className,
  )

  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  )
}

export default Button
