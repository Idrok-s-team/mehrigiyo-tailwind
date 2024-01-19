'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb, Pagination } from '@/components/common'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'
import { SortCriteriaType } from '@/types'
import { DoctorAppointmentDrawer } from '@/modules/doctors'
import CategoryFilter from '@/components/specific/CategoryFilter'
import SortOptions from '@/components/specific/SortOptions'
import { IDoctor } from '@/types/doctor'
import { DoctorOrProductList } from '@/components/specific'
import { useSortedData } from '@/hooks/common'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import Image from 'next/image'

const breadcrumbItems = [
  { text: 'Bosh sahifa', href: '/' },
  { text: 'Onlayn shifokorlar', href: '/online_doctors' },
  { text: 'Barchasi' },
]

const DoctorsCategory = () => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaType>('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const selectedCategories = searchParams.get('type')

  const { data: doctorTypesData, isLoading: isFetchingDoctorTypes } = useDoctorTypesQuery()
  const { data: doctorsData, isLoading: isFetchingDoctors } = useDoctorsQuery({
    params: { type_ides: selectedCategories as string },
  })
  const sortedData = useSortedData<IDoctor>(doctorsData?.results, sortCriteria)

  return (
    <div className="relative min-h-screen mt-14 px-10 mx-auto xl:px-24 max-md:px-4 max-w-[1440px] max-sm:mt-5">
      <header>
        <Breadcrumb items={breadcrumbItems} />
      </header>

      <section className="flex gap-[70px] max-xl:gap-5 max-md:flex-wrap">
        <div className="max-md:w-full">
          <CategoryFilter
            categories={doctorTypesData?.results}
            loading={isFetchingDoctorTypes}
            sortCriteria={sortCriteria}
            selectedCategories={selectedCategories}
            filterType='doctor'
          />
        </div>

        <div className="relative mt-3 flex-1">
          <SortOptions sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
          <DoctorOrProductList doctorsData={sortedData} itemType="doctor" loading={isFetchingDoctors} />
        </div>
      </section>

      {doctorsData && doctorsData?.count > 10 && (
        <section className="flex justify-end mt-12 relative">
          <Pagination
            currentPage={currentPage}
            pageSize={10}
            totalCount={doctorsData?.count as number}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      )}

      <DoctorAppointmentDrawer />

      {doctorsData && doctorsData?.count < 10 && (
        <section className="flex justify-end mt-[30%]">
          <Image src={backgroundBranch} alt={''} className="absolute -bottom-[16%] -right-[9%] scale-75 -z-10" />
        </section>
      )}
    </div>
  )
}

export default DoctorsCategory
