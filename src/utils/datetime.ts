import { DateFormat } from '@/constants'
import dayjs, { type Dayjs } from 'dayjs'

export const formatDate = (date: string | Dayjs | Date, format: string = DateFormat.LOCAL_DATETIME): string | null => {
  if (!date) return null
  return dayjs(date).format(format)
}

export const formatAppointmentTime = (selectedDay: string | null, selectedRangeTime: string | null) => {
  const formatTime = (day: string, hour: number) => {
    return dayjs(day).set('hour', hour).set('minute', 0).set('second', 0).format(DateFormat.ISO_DATETIME)
  }

  const parseTimeRange = (timeRange: string) => {
    const [start, end] = timeRange.split('-').map((time) => Number(time.split(':')[0]))
    return { startHour: start, endHour: end }
  }

  if (!selectedDay || !selectedRangeTime) {
    return { startTime: '', endTime: '' }
  }

  const { startHour, endHour } = parseTimeRange(selectedRangeTime)
  const startTime = formatTime(selectedDay, startHour)
  const endTime = formatTime(selectedDay, endHour)

  return { startTime, endTime }
}
