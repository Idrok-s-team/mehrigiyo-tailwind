import { DateFormat } from '@/constants'
import dayjs, { type Dayjs } from 'dayjs'

export const formatDate = (date: string | Dayjs | Date, format: string = DateFormat.LOCAL_DATETIME): string | null => {
  if (!date) return null
  return dayjs(date).format(format)
}
