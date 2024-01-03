'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDoctorTypesQuery } from '@/hooks/queries'

const DoctorTypesModule: FC = () => {
  const { data } = useDoctorTypesQuery()

  return (
    <div className="grid grid-cols-6 gap-x-[22px] gap-y-[30px] mt-8">
      {data?.results.map(({ id, name, image, get_doctors_count }) => (
        <Link
          key={id}
          href={`/online_doctors/category?type=${id}`}
          className="shadow-primary flex flex-col items-center justify-between p-5 py-4 w-[188px] rounded-2xl duration-300 transition-colors hover:bg-green-light hover:border-[0.5px] hover:border-green-primary"
          title={name}
        >
          <div className=" w-full h-9 flex items-center justify-center flex-shrink-0">
            <Image src={image} alt={name} width={30} height={30} />
          </div>
          <p className="font-medium text-center line-clamp-1 mt-2">{name}</p>
          <small className="text-[#6B779A] mt-1">{get_doctors_count?.toLocaleString('ru')} shifokor</small>
        </Link>
      ))}
    </div>
  )
}

export default DoctorTypesModule
