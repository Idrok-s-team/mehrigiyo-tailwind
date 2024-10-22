'use client'

import React, { forwardRef } from 'react'
import InputMask, { Props as MaskInputProps } from 'react-input-mask'
import clsx from 'clsx'

type Props = MaskInputProps & {
  label?: string
}

const MaskInput = forwardRef<any, Props>(({ className, label, ...props }, ref) => {
  const inputClassNames = clsx(
    'block w-full px-2 pb-3 pt-2 text-gray-900 border-b border-gray-[#E2E2E2] focus:outline-none focus:ring-0 focus:border-green-primary placeholder:text-gray-primary/40',
    className,
  )

  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="block text-sm text-[#C3C3C3]">
          {label}
          {props.required && <span className="ml-1 text-lg text-primary">*</span>}
        </label>
      )}
      <InputMask {...props} className={inputClassNames} ref={ref} />
    </div>
  )
})

export default MaskInput
