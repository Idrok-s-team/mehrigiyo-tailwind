import { InputHTMLAttributes, type ChangeEventHandler, type FC, useMemo } from 'react'
import clsx from 'clsx'
import { ElementSizeType, ISelectOption } from '@/types'

interface IProps extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: ISelectOption[]
  onChange?: ChangeEventHandler<HTMLSelectElement>
  size?: ElementSizeType
  className?: string
  label?: string
}

const Select: FC<IProps> = ({ options, onChange, size = 'md', className, label, ...props }) => {
  const classNames = clsx(
    'block w-full px-2 pb-3 pt-2 text-gray-900 border-b border-gray-[#E2E2E2] focus:outline-none focus:ring-0 focus:border-green-primary placeholder:text-gray-primary/40 appearance-none',
    {
      'text-sm': size === 'sm',
      'text-base': size === 'md',
      'text-lg': size === 'lg',
    },
    className,
  )

  const allOptions = useMemo(() => {
    const initialSelectOptions: ISelectOption[] = [{ label: "Yo'q", value: undefined }]
    return [...initialSelectOptions, ...options]
  }, [options])

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={props.id} className="flex items-center text-sm text-[#C3C3C3]">
          {label}
          {props.required && <span className="ml-1 text-lg text-primary">*</span>}
        </label>
      )}
      <select
        className={classNames}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 4 4 4-4'/%3E%3C/svg%3E\")",
          backgroundPosition: 'right 0.75rem center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '0.75em 0.75em',
          paddingRight: '2rem',
          printColorAdjust: 'exact',
        }}
        onChange={onChange}
        {...props}
      >
        {allOptions.map((option) => (
          <option key={option.label} value={option.value} selected={option.selected}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
