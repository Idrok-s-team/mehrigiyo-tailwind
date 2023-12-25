export const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const DateFormat = {
  ISO_DATE: 'YYYY-MM-DD',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',

  LOCAL_DATE: 'DD.MM.YYYY',
  LOCAL_TIME: 'HH:mm:ss',
  LOCAL_DATETIME: 'HH:mm / DD.MM.YYYY',
  // LOCAL_DATETIME: 'YYYY-MM-DD HH:MM',
} as const
