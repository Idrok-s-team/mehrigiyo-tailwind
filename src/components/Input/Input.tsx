'use client'

import React, { FC, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input: FC<Props> = ({ className, label, ...props }) => {
  const inputClassNames = clsx(
    'block w-full px-2 pb-3 pt-2 text-gray-900 border-b border-gray-[#E2E2E2] focus:outline-none focus:ring-0 focus:border-green-primary placeholder:text-gray-primary/40',
    className,
  )

  return (
    <div className="bg-white">
      {label && (
        <label htmlFor={props.id} className="flex items-center text-sm text-[#C3C3C3]">
          {label}
          {props.required && <span className="ml-1 text-lg text-primary">*</span>}
        </label>
      )}
      <input {...props} className={inputClassNames} />
    </div>
  )
}

export default Input
