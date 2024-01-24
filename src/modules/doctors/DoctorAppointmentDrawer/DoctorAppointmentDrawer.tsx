'use client'

import React, { FC, useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'
import { BookingIcon } from '@/assets/icons'
import { Drawer } from '@/components/common'
import { useCommonStore } from '@/store'
import { useAppointmentAvailability, useAppointmentData } from './hooks'
import { DayCard, TimeRangeCard } from './components'
import { useAppointmentStore } from '@/store'
import { useAddDoctorAdviceMutation } from '@/hooks/mutations'
import { formatAppointmentTime } from '@/utils'
import { useDoctorAdviceQuery } from '@/hooks/queries'
import { DateFormat, WARNING_TEXTS } from '@/constants'

type Props = {}

const DoctorAppointmentDrawer: FC<Props> = () => {
  const { activeModal, setActiveModal } = useCommonStore()
  const { selectedDay, selectedRangeTime, selectedDoctor, updateAppointmentState } = useAppointmentStore()
  const { daysGroupedByMonth, appointmentTimeSlots } = useAppointmentData()

  const { data: appointmentsData, refetch: refetchAppointment } = useDoctorAdviceQuery(
    { id: selectedDoctor?.id as number },
    { options: { enabled: activeModal === 'drawer' && !!selectedDoctor?.id } },
  )
  const { mutateAsync: addAppointment, isPending } = useAddDoctorAdviceMutation()

  const { isTimeRangeBusy } = useAppointmentAvailability(appointmentsData, selectedDay)
  const { startTime, endTime } = formatAppointmentTime(selectedDay, selectedRangeTime)

  const handleSelectDay = useCallback(
    (day: string) => {
      updateAppointmentState('selectedDay', dayjs(day).format(DateFormat.ISO_DATE))
    },
    [updateAppointmentState],
  )

  useEffect(() => {
    if (activeModal === 'drawer') {
      const today = dayjs().format(DateFormat.ISO_DATE)
      handleSelectDay(today)
    }
  }, [activeModal, handleSelectDay])

  const handleClose = useCallback(() => {
    setActiveModal(null)
    updateAppointmentState('selectedDoctor', null)
    updateAppointmentState('selectedRangeTime', null)
  }, [setActiveModal, updateAppointmentState])

  const handleSelectRangeTime = useCallback(
    (timeRange: string) => {
      if (!isTimeRangeBusy(timeRange)) {
        updateAppointmentState('selectedRangeTime', timeRange)
      } else {
        toast.error("Bu vaqt oralig'i band. Boshqa vaqtni tanlang.")
      }
    },
    [updateAppointmentState, isTimeRangeBusy],
  )

  const handleSubmitAppointment = async () => {
    if (selectedDoctor?.id && startTime && endTime) {
      const response = await addAppointment({
        id: selectedDoctor?.id as number,
        start_time: startTime,
        end_time: endTime,
      })

      if (response.status === 'success') {
        toast.success('Uchrashuv muvaffaqqiyatli belgilandi!')
        refetchAppointment()
        handleClose()
      } else {
        toast.error(
          response.data.includes('busy')
            ? 'Kechirasiz bu vaqt band qilingan. Boshqa vaqtni tanlang.'
            : WARNING_TEXTS.SOMETHING_WENT_WRONG,
        )
      }
    }
  }

  const isSubmitDisabled = !startTime || !endTime || isPending

  return (
    <Drawer
      isOpen={activeModal === 'drawer'}
      onClose={handleClose}
      onSubmit={handleSubmitAppointment}
      disabled={isSubmitDisabled}
      buttonText={isPending ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
    >
      <div className="mt-5 px-28 max-w-[1440px] mx-auto max-xl:px-12 max-lg:px-6 max-sm:px-0">
        <section className="flex item-center justify-between">
          <div>
            <h3 className="text-[28px]">Maslahat kunini band qiling</h3>
            <p className="mt-3 text-[#505050]">Iltimos, maslahat kuniga borishdan oldin kun va vaqtni tanlang</p>
          </div>
          <div className="md:mr-12">
            <BookingIcon />
          </div>
        </section>
        <section className="mt-2">
          {Object.entries(daysGroupedByMonth).map(([monthYear, daysInMonth], index) => (
            <React.Fragment key={monthYear}>
              <p className="italic">{monthYear}</p>
              <div className="flex gap-4 mt-4 max-xl:gap-2.5 max-lg:flex-wrap ju">
                {daysInMonth.map((day) => {
                  const dayFormatted = dayjs(day).format(DateFormat.ISO_DATE)
                  return (
                    <DayCard
                      key={dayFormatted}
                      day={dayjs(day).format('ddd')}
                      date={dayjs(day).format('DD')}
                      isSelected={selectedDay === dayFormatted}
                      onSelect={() => handleSelectDay(day)}
                    />
                  )
                })}
              </div>
              {index < Object.keys(daysGroupedByMonth).length - 1 && <div className="my-4" />}
            </React.Fragment>
          ))}
        </section>
        <section className="grid grid-cols-3 gap-x-3.5 gap-y-4 mt-7 max-sm:grid-cols-2 max-xs:grid-cols-1 max-sm:gap-y-2">
          {appointmentTimeSlots.map(({ range }) => (
            <TimeRangeCard
              key={range}
              timeRange={range}
              isSelected={selectedRangeTime === range}
              isBooked={isTimeRangeBusy(range)}
              onSelect={() => handleSelectRangeTime(range)}
            />
          ))}
        </section>
      </div>
    </Drawer>
  )
}

export default DoctorAppointmentDrawer
