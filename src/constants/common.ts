export const baseUrl = process.env.NEXT_PUBLIC_MAIN_URL
export const baseApiUrl = process.env.NEXT_PUBLIC_API_URL
export const baseSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL

export const DateFormat = {
  ISO_DATE: 'YYYY-MM-DD',
  ISO_DATETIME: 'YYYY-MM-DDTHH:mm:ss',
  LOCAL_DATE: 'DD.MM.YYYY',
  LOCAL_TIME: 'HH:mm',
  LOCAL_DATETIME: 'HH:mm / DD.MM.YYYY',
} as const
