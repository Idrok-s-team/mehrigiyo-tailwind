import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export function inputHandler<T>(setState: Dispatch<SetStateAction<T>>) {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
}

export function selectHandler<T>(setState: Dispatch<SetStateAction<T>>, name: string) {
  return (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value ?? null,
    }))
  }
}
