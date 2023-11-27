import { Dispatch, SetStateAction } from 'react'

export const updateFilters = (
  currentValue: number,
  isChecked: boolean,
  setFilters: Dispatch<SetStateAction<number[]>>,
) => {
  setFilters((prevFilters) => {
    if (isChecked) {
      if (!prevFilters.includes(currentValue)) {
        return [...prevFilters, currentValue]
      }
    } else {
      return prevFilters.filter((item) => item !== currentValue)
    }
    return prevFilters
  })
}

export const parsePhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '')
}
