'use client'

import { FC } from 'react'
import { Loader, Tabs } from '@/components'
import { useDoctorAdviceQuery, useDoctorsQuery } from '@/hooks/queries'
import Image from 'next/image'

const ConsultationModule: FC = () => {
  const { data, isLoading } = useDoctorsQuery()

  const Ongoing = () => {
    return (
      <div className="flex flex-col gap-5 bg-white px-[30px] py-8 rounded-[20px] shadow-sidebar">
        {data?.results.map((doctor) => (
          <div key={doctor.id} className="flex gap-[13px]">
            <Image
              src={doctor.image}
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
              <section className="mt-1">
                <p>12.12.2021</p>
              </section>
            </div>
          </div>
        ))}
      </div>
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
