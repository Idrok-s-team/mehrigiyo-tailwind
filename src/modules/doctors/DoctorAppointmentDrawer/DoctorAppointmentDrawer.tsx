'use client'

import React, { FC } from 'react'
import { BookingIcon } from '@/assets/icons'
import { Drawer } from '@/components'
import { useCommonStore } from '@/store'
import { useAppointmentData } from './hooks'
import { DayCard, TimeRangeCard } from './components'
import useAppointmentStore from '@/store/appointment'
import { useAddDoctorAdviceMutation } from '@/hooks/mutations'

type Props = {}

const DoctorAppointmentDrawer: FC<Props> = () => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedDay, selectedRangeTime, selectedDoctor, updateAppointmentState } = useAppointmentStore()
  const { daysGroupedByMonth, appointmentTimeSlots } = useAppointmentData()
  console.log(selectedDoctor)

  const { mutateAsync: addAppointment } = useAddDoctorAdviceMutation()

  const handleSubmitAppointment = () => {
    const time = selectedRangeTime?.split(' ')
    addAppointment({
      id: Number(selectedDoctor?.id),
      start_time: time?.[0] as string,
      end_time: time?.[2] as string,
    }).then((res) => console.log(res))
  }

  const handleClose = () => {
    setActiveModal(null)
    updateAppointmentState('selectedDoctor', null)
  }

  const handleSelectDay = (day: string, monthYear: string) => {
    updateAppointmentState('selectedDay', `${day} ${monthYear}`)
  }

  const handleSelectRangeTime = (timeRange: string) => {
    updateAppointmentState('selectedRangeTime', timeRange)
  }

  return (
    <Drawer isOpen={activeModal === 'drawer'} onClose={handleClose} onSubmit={handleSubmitAppointment}>
      <div className="mt-14 px-28">
        <section className="flex item-center justify-between">
          <div>
            <h3 className="text-[28px]">Maslahat kunini band qiling</h3>
            <p className="mt-3 text-[#505050]">Iltimos, maslahat kuniga borishdan oldin kun va vaqtni tanlang</p>
          </div>
          <div className="mr-12">
            <BookingIcon />
          </div>
        </section>
        <section className="mt-2">
          {Object.entries(daysGroupedByMonth).map(([monthYear, daysInMonth], index) => (
            <React.Fragment key={monthYear}>
              <p>{monthYear}</p>
              <div className="flex gap-4 mt-4">
                {daysInMonth.map(({ weekDay, dateNumber }) => (
                  <DayCard
                    key={`${dateNumber} ${monthYear}`}
                    day={weekDay}
                    date={dateNumber}
                    isSelected={selectedDay === `${dateNumber} ${monthYear}`}
                    onSelect={() => handleSelectDay(dateNumber, monthYear)}
                  />
                ))}
              </div>
              {index < Object.keys(daysGroupedByMonth).length - 1 && <div className="my-4" />}
            </React.Fragment>
          ))}
        </section>
        <section className="grid grid-cols-3 gap-x-3.5 gap-y-4 mt-7">
          {appointmentTimeSlots.map(({ range }) => (
            <TimeRangeCard
              key={range}
              timeRange={range}
              isSelected={selectedRangeTime === range}
              onSelect={() => handleSelectRangeTime(range)}
            />
          ))}
        </section>
      </div>
    </Drawer>
  )
}

export default DoctorAppointmentDrawer
