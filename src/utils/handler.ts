import { ChangeEvent, SetStateAction } from 'react'

export const inputHandler =
  (callback: SetStateAction<any>) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = event
    const { name, value } = target

    callback((prevState: {}) => ({
      ...prevState,
      [name]: value,
    }))
  }
