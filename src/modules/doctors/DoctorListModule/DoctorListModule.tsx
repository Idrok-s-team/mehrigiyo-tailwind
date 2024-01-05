'use client'

import { FC, useMemo } from 'react'
import { SeeAllButton, Slider } from '@/components/common'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'
import { DoctorCard, DoctorCardSkeleton, ProductCardSkeleton } from '@/components/specific'
import { SwiperSlide } from 'swiper/react'

type Props = {
  title?: string
  withFilter?: boolean
}

const DoctorListModule: FC<Props> = ({ title = 'Top shifokorlar', withFilter = true }) => {
  const { data: doctorsData, isLoading: isFetchingDoctors } = useDoctorsQuery()
  const { data: doctorTypesData, isLoading: isFetchingDoctorTypes } = useDoctorTypesQuery()

  const filterValues = useMemo(
    () => [
      { key: '', title: 'Hammasi' },
      ...(doctorTypesData?.results.map((value) => ({ key: value.id, title: value.name })) || []),
    ],
    [doctorTypesData?.results],
  )

  return (
    <>
      <div className="flex items-center justify-between">
        <h4>{title}</h4>
        <SeeAllButton text="Barchasini ko'rish" href='/online_doctors/category' />
      </div>
      {withFilter && (
        <nav
          className="flex items-center text-lg text-gray-primary"
          style={{ gap: 24, marginTop: 32, listStyle: 'none' }}
        >
          {isFetchingDoctorTypes ? (
            <div className={`w-20 h-10 grid grid-cols-4 gap-7`}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full h-5 duration-300 bg-gray-300 rounded-md animate-pulse"></div>
              ))}
            </div>
          ) : (
            filterValues?.map(({ key, title }) => (
              <li key={key} className="list-none cursor-pointer">
                {title}
              </li>
            ))
          )}
        </nav>
      )}

      <div className="mt-10">
        {isFetchingDoctors ? (
          <div className="flex gap-[30px]">
            {Array.from({ length: 6 }).map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Slider slidesPerView={5.4}>
            {doctorsData?.results.map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <DoctorCard data={doctor} />
              </SwiperSlide>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default DoctorListModule
