import sanitizeHtml from 'sanitize-html'

export const clearObject = (object: object) => {
  return Object.fromEntries(
    Object.entries(object).filter(([_, value]) => {
      return (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.every((item) => item === null))
      )
    }),
  )
}
export const formatPlasticCardNumber = (cardNumber: string | number) => {
  const cardNumberStr = String(cardNumber)

  if (cardNumberStr.length !== 16) {
    throw new Error('Invalid card number length. It should be 16 digits.')
  }

  const firstFourDigits = cardNumberStr.substring(0, 4)
  const middleTwoDigits = cardNumberStr.substring(4, 6)
  const lastFourDigits = cardNumberStr.substring(12, 16)

  return `${firstFourDigits} ${middleTwoDigits}** **** ${lastFourDigits}`
}

export const cleanHtml = (dirtyHtml: string, options?: sanitizeHtml.IOptions): string => {
  const defaultOptions: sanitizeHtml.IOptions = {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
  }

  return sanitizeHtml(dirtyHtml, { ...defaultOptions, ...options })
}
