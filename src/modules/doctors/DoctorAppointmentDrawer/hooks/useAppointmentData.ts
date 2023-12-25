import { useState, useEffect } from 'react'
import dayjs from 'dayjs'

type DayInfo = {
  weekDay: string
  dateNumber: string
  monthName: string
  year: string
}

type DaysGrouped = {
  [key: string]: DayInfo[]
}

type AppointmentTimeInterval = {
  range: string
  start: string
  end: string
}

export const useAppointmentData = () => {
  const [daysGroupedByMonth, setDaysGroupedByMonth] = useState<Record<string, DayInfo[]>>({})
  const [appointmentTimeSlots, setAppointmentTimeSlots] = useState<AppointmentTimeInterval[]>([])

  useEffect(() => {
    // Generate days for the next two weeks
    const upcomingDays: DayInfo[] = []
    for (let i = 0; i < 14; i++) {
      const date = dayjs().add(i, 'day')
      upcomingDays.push({
        weekDay: date.format('ddd'),
        dateNumber: date.format('DD'),
        monthName: date.format('MMM'),
        year: date.format('YYYY'),
      })
    }

    const daysByMonth = upcomingDays.reduce((acc: DaysGrouped, day) => {
      const monthYearKey = `${day.monthName} ${day.year}`
      if (!acc[monthYearKey]) {
        acc[monthYearKey] = []
      }
      acc[monthYearKey].push(day)
      return acc
    }, {})

    setDaysGroupedByMonth(daysByMonth)

    const timeSlots: AppointmentTimeInterval[] = []
    const workdayStart = 9 // 9 AM
    const lunchBreakStart = 12 // Exclude 12 PM to 2 PM
    const lunchBreakEnd = 14 // Resume at 2 PM

    for (let hour = workdayStart; hour <= workdayStart + 7; hour++) {
      if (hour < lunchBreakStart || hour >= lunchBreakEnd) {
        const startHourFormatted = `${hour.toString().padStart(2, '0')}:00`
        const endHourFormatted = `${(hour + 1).toString().padStart(2, '0')}:00`
        timeSlots.push({
          range: `${startHourFormatted} - ${endHourFormatted}`,
          start: startHourFormatted,
          end: endHourFormatted,
        })
      }
    }

    setAppointmentTimeSlots(timeSlots)
  }, [])

  return { daysGroupedByMonth, appointmentTimeSlots }
}

export default useAppointmentData
