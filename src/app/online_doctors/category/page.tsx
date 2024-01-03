'use client'

import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb, Pagination } from '@/components/common'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'
import { SortCriteriaType } from '@/types'
import { DoctorAppointmentDrawer } from '@/modules/doctors'
import CategoryFilter from '@/components/specific/CategoryFilter'
import SortOptions from '@/components/specific/SortOptions'
import { IDoctor } from '@/types/doctor'
import Itemlist from '@/components/specific/DoctorOrProductList'
import { useSortedData } from '@/hooks/common'

const breadcrumbItems = [
  { text: 'Bosh sahifa', href: '/' },
  { text: 'Mahsulotlar', href: '/products' },
  { text: 'Barchasi' },
]

const DoctorsCategory = () => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaType>('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const selectedCategories = searchParams.get('type')

  const { data: doctorTypesData, isFetching: isFetchingDoctorTypes } = useDoctorTypesQuery()
  const { data: doctorsData, isFetching: isFetchingDoctors } = useDoctorsQuery({
    params: { type_ides: selectedCategories as string },
  })
  const sortedData = useSortedData<IDoctor>(doctorsData?.results, sortCriteria)

  return (
    <div className="relative min-h-screen px-24 mt-14">
      <header>
        <Breadcrumb items={breadcrumbItems} />
      </header>

      <section className="flex gap-[70px]">
        <CategoryFilter
          categories={doctorTypesData?.results}
          loading={isFetchingDoctorTypes}
          sortCriteria={sortCriteria}
          selectedCategories={selectedCategories}
        />

        <div className="relative mt-3">
          <SortOptions sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} />
          <Itemlist doctorsData={sortedData} itemType="doctor" loading={isFetchingDoctors} />
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
    </div>
  )
}

export default DoctorsCategory
