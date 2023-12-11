import { QueryParamsType } from '@/types'

export const clearObject = (object: QueryParamsType) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== '' && value !== null && value !== undefined
    }),
  ) as Record<string, string>
}

export const formatPlasticCardNumber = (cardNumber: string | number) => {
  const cardNumberStr = String(cardNumber) // Ensure cardNumber is a string

  if (cardNumberStr.length !== 16) {
    throw new Error('Invalid card number length. It should be 16 digits.')
  }

  const firstFourDigits = cardNumberStr.substring(0, 4)
  const middleTwoDigits = cardNumberStr.substring(4, 6)
  const lastFourDigits = cardNumberStr.substring(12, 16)

  return `${firstFourDigits} ${middleTwoDigits}** **** ${lastFourDigits}`
}
