'use client'

import React, { FC, useCallback } from 'react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { BookingIcon } from '@/assets/icons'
import { Drawer } from '@/components'
import { useCommonStore } from '@/store'
import { useAppointmentData } from './hooks'
import { DayCard, TimeRangeCard } from './components'
import useAppointmentStore from '@/store/appointment'
import { useAddDoctorAdviceMutation } from '@/hooks/mutations'
import { formatAppointmentTime } from '@/utils'

type Props = {}

const DoctorAppointmentDrawer: FC<Props> = () => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedDay, selectedRangeTime, selectedDoctor, updateAppointmentState } = useAppointmentStore()
  const { daysGroupedByMonth, appointmentTimeSlots } = useAppointmentData()

  const { mutateAsync: addAppointment, isPending } = useAddDoctorAdviceMutation()
  const { startTime, endTime } = formatAppointmentTime(selectedDay, selectedRangeTime)

  const handleSubmitAppointment = async () => {
    if (selectedDoctor?.id && startTime && endTime) {
      const response = await addAppointment({
        id: selectedDoctor?.id as number,
        start_time: startTime,
        end_time: endTime,
      })

      if (response.status === 'success') {
        toast.success('Uchrashuv muvaffaqqiyatli belgilandi!')
        handleClose()
      } else {
        const isBusyTime = response.data.includes('busy')
        toast.error(
          isBusyTime ? "Kechirasiz bu vaqt band qilingan. Boshqa vaqt tanlab ko'ring" : 'Biror narsa xato ketdi',
        )
      }
    }
  }

  const handleClose = useCallback(() => {
    setActiveModal(null)
    updateAppointmentState('selectedDoctor', null)
  }, [setActiveModal, updateAppointmentState])

  const handleSelectDay = useCallback(
    (day: string) => {
      updateAppointmentState('selectedDay', day)
    },
    [updateAppointmentState],
  )

  const handleSelectRangeTime = useCallback(
    (timeRange: string) => {
      updateAppointmentState('selectedRangeTime', timeRange)
    },
    [updateAppointmentState],
  )

  const isSubmitDisabled = !startTime || !endTime || isPending

  return (
    <Drawer
      isOpen={activeModal === 'drawer'}
      onClose={handleClose}
      onSubmit={handleSubmitAppointment}
      disabled={isSubmitDisabled}
      buttonText={isPending ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
    >
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
                {daysInMonth.map((day) => (
                  <DayCard
                    key={day}
                    day={dayjs(day).format('ddd')}
                    date={dayjs(day).format('DD')}
                    isSelected={selectedDay === day}
                    onSelect={() => handleSelectDay(day)}
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
