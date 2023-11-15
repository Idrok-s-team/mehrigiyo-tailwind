import { type FC, type InputHTMLAttributes } from 'react'
import clsx from 'clsx'
import { type ElementSizeType } from '@/types'

export interface IProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  size?: ElementSizeType
}

const Input: FC<IProps> = function Input({ className, label, size = 'md', ...props }: IProps) {
  const classNames = clsx(
    'block w-full px-2 text-sm text-gray-900 border border-gray-300 rounded-lg !focus:ring-green-dark !focus:border-green-dark',
    {
      'h-6': size === 'sm',
      'h-9': size === 'md',
      'h-12 text-base': size === 'lg',
    },
    className,
  )

  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block mb-0.5 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input className={classNames} {...props} />
    </div>
  )
}

export default Input
