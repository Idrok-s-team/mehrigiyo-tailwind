'use client'

import { FC, useMemo } from 'react'
import { DoctorCard, ProductCardSkeleton, SeeAllButton, Slider } from '@/components'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'

type Props = {
  title?: string
  withFilter?: boolean
}

const DoctorListModule: FC<Props> = ({ title = 'Top shifokorlar', withFilter = true }) => {
  const { data: doctorsData, isFetching: isFetchingDoctors } = useDoctorsQuery()
  const { data: doctorTypesData, isFetching: isFetchingDoctorTypes } = useDoctorTypesQuery()

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
        <SeeAllButton text="Barchasini ko'rish" />
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
          <div className="grid grid-cols-5 gap-7 ">
            {Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <Slider slides={{ perView: 5.4 }}>
            {doctorsData?.results.map((doctor) => (
              <div key={doctor.id} className="keen-slider__slide">
                <DoctorCard data={doctor} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  )
}

export default DoctorListModule
