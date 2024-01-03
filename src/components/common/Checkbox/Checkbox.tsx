import React, { FC, InputHTMLAttributes } from 'react'
import { CheckboxIcon } from '@/assets/icons'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Checkbox: FC<Props> = ({ label, checked, className, ...props }) => {
  const checkboxId = props.id || `checkbox-${label}`

  return (
    <div className="flex items-center cursor-pointer">
      <input {...props} id={checkboxId} type="checkbox" className="hidden" />
      <label htmlFor={checkboxId} className="cursor-pointer">
        {checked ? <CheckboxIcon /> : <div className="w-5 h-5 mx-0.5 border border-gray-primary rounded-[5px]"></div>}
      </label>

      <label htmlFor={checkboxId} className={`${checked ? 'font-medium' : ''} pl-3 cursor-pointer`}>
        {label}
      </label>
    </div>
  )
}

export default Checkbox
