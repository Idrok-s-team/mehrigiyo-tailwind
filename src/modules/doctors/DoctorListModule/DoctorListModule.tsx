'use client'

import { FC, useMemo } from 'react'
import { SeeAllButton, Slider } from '@/components/common'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'
import { DoctorCard, DoctorCardSkeleton } from '@/components/specific'
import { SwiperSlide } from 'swiper/react'
import { ROUTES } from '@/constants'

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
      <div className="flex items-center justify-between max-sm:flex-wrap">
        <h4>{title}</h4>
        <SeeAllButton text="Barchasini ko'rish" href={ROUTES.ONLINE_DOCTORS_CATEGORY} className="max-sm:mt-2" />
      </div>
      {withFilter && (
        <nav
          className="w-1/2 flex items-center text-lg text-gray-primary animate-fade-in max-lg:w-full"
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
          <Slider
            // slidesPerView={5.4}
            breakpoints={{
              1290: {
                slidesPerView: 5.4,
              },
              1090: {
                slidesPerView: 5,
              },
              990: {
                slidesPerView: 4.5,
              },
              890: {
                slidesPerView: 4,
              },
              790: {
                slidesPerView: 3.5,
              },
              640: {
                slidesPerView: 3,
              },
              535: {
                slidesPerView: 2.5,
              },
              460: {
                slidesPerView: 2.1,
              },
              360: {
                slidesPerView: 1.6,
              },
              300: {
                slidesPerView: 1.2,
              },
              240: {
                slidesPerView: 1,
              },
            }}
          >
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
