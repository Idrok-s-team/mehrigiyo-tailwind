import React, { FC, InputHTMLAttributes, memo } from 'react'
import InputMask from 'react-input-mask'
import clsx from 'clsx'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const UnifiedInput: FC<Props> = ({ className, label, ...props }) => {
  const inputClassNames = clsx(
    'block w-full px-2 pb-3 pt-2 text-gray-900 border-b border-gray-[#E2E2E2] focus:outline-none focus:ring-0 focus:border-green-primary',
    className,
  )

  const renderInput = () => {
    if (props.type === 'tel') {
      return (
        <InputMask
          {...props}
          mask="+\9\98 99 999 99 99"
          placeholder="+998 _ _  _ _ _ - _ _ - _ _"
          maskChar="_"
          alwaysShowMask
          className={inputClassNames}
        />
      )
    }
    return <input {...props} className={inputClassNames} />
  }

  return (
    <div className="bg-white">
      {label && (
        <label htmlFor={props.id} className="block text-sm text-[#C3C3C3]">
          {label}
          {props.required && <span className="ml-1 text-lg text-primary">*</span>}
        </label>
      )}
      {renderInput()}
    </div>
  )
}

export default memo(UnifiedInput)
