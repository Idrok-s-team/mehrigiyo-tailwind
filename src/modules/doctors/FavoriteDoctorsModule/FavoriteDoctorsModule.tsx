'use client'

import React from 'react'
import { useUserFavoriteDoctorsQuery } from '@/hooks/queries'
import { EmptyBox, Loader } from '@/components/common'
import { DoctorCard } from '@/components/specific'

const FavoriteDoctorsModule = () => {
  const { data, isLoading } = useUserFavoriteDoctorsQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-w-[15vw] min-h-[50vh] animate-fade-in">
        <Loader />
      </div>
    )
  }

  if (data?.count === 0) {
    return (
      <EmptyBox
        title="Sevimli shifokor yo'q"
        description="Uzoq vaqt qidirmaslik uchun o'zingiz yoqtirgan shifokorlarni saqlang"
      />
    )
  }

  return (
    <div className="mt-2.5 animate-fade-in">
      <h4>Sevimlilarda {data?.count} ta shifokor bor</h4>
      <div className="grid grid-cols-5 gap-[30px] mt-[30px] justify-between max-xl:gap-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-2xs:grid-cols-1">
        {data?.results.map((doctor) => <DoctorCard key={doctor.id} data={doctor} />)}
      </div>
    </div>
  )
}

export default FavoriteDoctorsModule
