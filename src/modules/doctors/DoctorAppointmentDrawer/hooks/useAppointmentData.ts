import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

type DayInfo = {
  formattedDate: string
  monthYearKey: string
}

type DaysGrouped = {
  [key: string]: string[]
}

type AppointmentTimeInterval = {
  range: string
  start: string
  end: string
}

export const useAppointmentData = () => {
  const [daysGroupedByMonth, setDaysGroupedByMonth] = useState<DaysGrouped>({})
  const [appointmentTimeSlots, setAppointmentTimeSlots] = useState<AppointmentTimeInterval[]>([])

  useEffect(() => {
    const upcomingDays = generateUpcomingDays()
    setDaysGroupedByMonth(groupDaysByMonth(upcomingDays))
    setAppointmentTimeSlots(generateAppointmentTimeSlots())
  }, [])

  const generateUpcomingDays = (): DayInfo[] => {
    return Array.from({ length: 14 }, (_, i) => {
      const date = dayjs().add(i, 'day')
      return {
        formattedDate: date.toString(),
        monthYearKey: `${date.format('MMM')} ${date.format('YYYY')}`,
      }
    })
  }
  const groupDaysByMonth = (days: DayInfo[]): DaysGrouped => {
    return days.reduce((acc: DaysGrouped, day) => {
      const { formattedDate, monthYearKey } = day
      if (!acc[monthYearKey]) {
        acc[monthYearKey] = []
      }
      acc[monthYearKey].push(formattedDate)
      return acc
    }, {})
  }

  const generateAppointmentTimeSlots = (): AppointmentTimeInterval[] => {
    const workdayHours = Array.from({ length: 8 }, (_, i) => i + 9) // 9 AM to 5 PM
    return workdayHours
      .filter((hour) => hour < 12 || hour >= 14) // Exclude 12 PM to 2 PM
      .map((hour) => {
        const startHourFormatted = `${hour.toString().padStart(2, '0')}:00`
        const endHourFormatted = `${(hour + 1).toString().padStart(2, '0')}:00`
        return {
          range: `${startHourFormatted} - ${endHourFormatted}`,
          start: startHourFormatted,
          end: endHourFormatted,
        }
      })
  }

  return { daysGroupedByMonth, appointmentTimeSlots }
}

export default useAppointmentData
