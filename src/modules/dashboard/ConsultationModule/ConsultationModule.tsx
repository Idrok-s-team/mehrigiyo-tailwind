'use client'

import { FC } from 'react'
import { Loader, Tabs } from '@/components'
import { useDoctorAdviceQuery } from '@/hooks/queries'
import Image from 'next/image'
import dayjs from 'dayjs'
import { baseUrl } from '@/constants'
import { UpcomingTimeIcon } from '@/assets/icons'
import Link from 'next/link'

const ConsultationModule: FC = () => {
  const { isLoading, data: appointmentsData } = useDoctorAdviceQuery({ my: true })

  const Ongoing = () => {
    return (
      <Link
        href="/dashboard/consultation/chat"
        className="flex flex-col bg-white rounded-[20px] shadow-sidebar overflow-hidden"
      >
        {appointmentsData?.data.map((appointment) => {
          const { doctor, start_time, end_time } = appointment
          return (
            <div
              key={appointment.id}
              className="flex gap-[13px] pt-5 px-[30px] cursor-pointer duration-100 hover:bg-green-primary/10"
            >
              <Image
                src={`${baseUrl}/${doctor.image}`}
                alt={doctor.full_name}
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
              <div className="flex-1 flex justify-between border-b-[#D7D7D7] border-b-[0.5px] pb-5 text-[#181725]/80">
                <section>
                  <h6>{doctor.full_name}</h6>
                  <p>{doctor.type_doctor.name}</p>
                </section>
                <section className="mt-1 flex items-center gap-2">
                  <UpcomingTimeIcon />
                  <p>
                    {dayjs(start_time).format('DD-MMMM')},&nbsp;
                    <span className="font-semibold">{dayjs(start_time).format('HH:mm')}</span>-
                    <span className="font-semibold">{dayjs(end_time).format('HH:mm')}</span>
                  </p>
                </section>
              </div>
            </div>
          )
        })}
      </Link>
    )
  }

  return (
    <>
      <div className="w-full min-h-[78.5vh] pr-24 relative">
        {isLoading ? (
          <div className="w-full relative flex items-center justify-center min-h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className="animate-fade-in">
            <section className="flex items-center justify-between">
              <div>
                <h4>Konsultatsiya</h4>
                <p className="text-sm text-gray-primary">Bugun bemorlarimizga xizmat qilish uchun ajoyib kun.</p>
              </div>
            </section>
            <div className="mt-10">
              <Tabs
                items={[
                  { key: 'ongoing', label: 'Hozirgi', children: <Ongoing /> },
                  { key: 'finished', label: 'Tugatilgan' },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ConsultationModule
