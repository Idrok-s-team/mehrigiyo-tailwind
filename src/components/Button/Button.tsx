import { ButtonHTMLAttributes, FC } from 'react'
import clsx from 'clsx'
import { ElementSizeType } from '@/types'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ElementSizeType
}

const Button: FC<Props> = ({ children, type = 'button', className, size = 'md', ...props }) => {
  const classNames = clsx(
    'flex items-center gap-4 py-3 px-6 rounded-[60px] bg-green-primary text-white duration-300 hover:shadow-primary',
    {
      'h-9': size === 'sm',
      'h-11': size === 'md',
      'h-[50px]': size === 'lg',
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
