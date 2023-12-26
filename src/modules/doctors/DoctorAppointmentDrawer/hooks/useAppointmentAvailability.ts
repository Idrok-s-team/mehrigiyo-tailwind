import { useCallback } from 'react'
import dayjs from 'dayjs'

interface Appointment {
  start_time: string
  end_time: string
}

interface AppointmentsData {
  data: Appointment[]
}

export const useAppointmentAvailability = (
  appointmentsData: AppointmentsData | undefined,
  selectedDay: string | null,
) => {
  const getBusyHoursForSelectedDay = useCallback(() => {
    if (!selectedDay) return []

    return appointmentsData?.data
      .filter((appointment) => dayjs(appointment.start_time).isSame(selectedDay, 'day'))
      .map((appointment) => ({
        startHour: dayjs(appointment.start_time).hour(),
        endHour: dayjs(appointment.end_time).hour(),
      }))
  }, [appointmentsData, selectedDay])

  const isTimeRangeBusy = useCallback(
    (timeRange: string) => {
      if (!selectedDay) return false

      const [startStr, endStr] = timeRange.split(' - ').map((str) => Number(str.split(':')[0]))
      const busyHours = getBusyHoursForSelectedDay()

      return busyHours?.some(({ startHour, endHour }) => startHour <= startStr && endHour >= endStr)
    },
    [getBusyHoursForSelectedDay, selectedDay],
  )

  return { isTimeRangeBusy }
}

export default useAppointmentAvailability
