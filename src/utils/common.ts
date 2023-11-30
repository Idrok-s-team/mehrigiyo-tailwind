import { Dispatch, SetStateAction } from 'react'
import Cookies from 'js-cookie'

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

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}

export const setCookie = (name: string, value: string, options = {}): void => {
  Cookies.set(name, value, options)
}

export const createSlug = (name: string, id: number) => {
  return (
    name
      .replace(/[.,\/#!$%\^&\*;"':{}=\-_`~()]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase() + `___${id}`
  )
}
