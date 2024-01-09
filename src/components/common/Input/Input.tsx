'use client'

import React, { FC, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: ReactNode
  onClickIcon?: () => void
}

const Input: FC<Props> = ({ className, label, icon, onClickIcon, ...props }) => {
  const inputClassNames = clsx(
    'block w-full px-2 pb-3 pt-2 pr-8 text-gray-900 border-b border-[#B0B7C3]/50 focus:outline-none focus:ring-0 focus:border-green-primary placeholder:text-gray-primary/40',
    className,
  )

  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="flex items-center text-sm text-[#C3C3C3]">
          {label}
          {props.required && <span className="ml-1 text-lg text-primary">*</span>}
        </label>
      )}
      <input {...props} className={inputClassNames} />
      {icon && (
        <button className="absolute right-0 bottom-2.5 cursor-pointer p-1" onClick={onClickIcon} type="button">
          {icon}
        </button>
      )}
    </div>
  )
}

export default Input
