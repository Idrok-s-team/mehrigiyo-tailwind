'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb, Checkbox, DoctorCard, Loader, Pagination } from '@/components'
import { ResetIcon } from '@/assets/icons'
import { useDoctorTypesQuery, useDoctorsQuery } from '@/hooks/queries'
import { sortOptions } from '@/constants'
import { SortCriteriaType } from '@/types'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { useSortedData, useSyncUrlQueryParams } from '@/hooks/common'
import { updateFilters } from '@/utils'

const DoctorsCategory = () => {
  const [productFilters, setProductFilters] = useState<number[]>([])
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaType>('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const typeParams = searchParams.get('type')

  const { data: doctorTypesData, isFetching: isFetchingDoctorTypes } = useDoctorTypesQuery()
  const { data: doctorsData, isFetching: isFetchingDoctors } = useDoctorsQuery({
    params: { type_ides: typeParams as string },
  })

  useSyncUrlQueryParams('type', productFilters)
  useSyncUrlQueryParams('sort', sortCriteria)

  useEffect(() => {
    if (typeParams?.length) {
      setProductFilters(typeParams.split(',').map(Number))
    }
  }, [typeParams])

  const sortedData = useSortedData(doctorsData?.results, sortCriteria)

  const handleClear = useCallback(() => {
    setProductFilters([])
  }, [])

  const breadcrumbItems = useMemo(
    () => [{ text: 'Bosh sahifa', href: '/' }, { text: 'Mahsulotlar', href: '/products' }, { text: 'Barchasi' }],
    [],
  )

  return (
    <div className="relative min-h-screen px-24 mt-14">
      <header>
        <Breadcrumb items={breadcrumbItems} />
      </header>

      <section className="flex gap-[70px]">
        <aside className="relative flex flex-col">
          <h4 className="mt-3">Mahsulotlar</h4>
          <Image src={backgroundLeaf} alt="" priority className="absolute -left-[40%] top-[2%]" />
          <div className="relative w-[280px] flex flex-col p-5 gap-3 shadow-primary rounded-2xl mt-6 bg-white">
            <div className="flex items-center justify-between">
              <h6 className="text-base">Kategoriyalar</h6>
              <button className="flex items-center gap-[6px] group" onClick={handleClear}>
                <span>
                  <ResetIcon />
                </span>
                <span className="text-sm text-gray-primary group-hover:underline">Tozalash</span>
              </button>
            </div>
            {isFetchingDoctorTypes ? (
              <div className="flex items-center justify-center min-w-[15vw] min-h-[50vh]">
                <Loader />
              </div>
            ) : (
              <div className="flex flex-col gap-3 animate-fade-in">
                {doctorTypesData?.results.map(({ id, name }) => (
                  <Checkbox
                    key={id}
                    value={id}
                    id={id.toString()}
                    checked={productFilters.includes(id)}
                    label={name}
                    onChange={({ target: { value, checked } }) =>
                      updateFilters(Number(value), checked, setProductFilters)
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </aside>

        <div className="relative mt-3">
          <Image src={backgroundLeaf} alt="" priority className="absolute -right-[37%] top-[5%]" />
          <nav className="flex items-center gap-5 my-3">
            <span className="text-sm">Saralash:</span>
            <ul className="flex items-center gap-5">
              {sortOptions.map(({ label, value }, i) => (
                <li
                  key={label}
                  className={`text-sm cursor-pointer text-gray-primary duration-200 ${
                    sortCriteria === value ? 'text-green-primary underline font-medium' : ''
                  }`}
                  onClick={() => setSortCriteria(value)}
                >
                  {label}
                </li>
              ))}
            </ul>
          </nav>

          {isFetchingDoctors ? (
            <div className="flex items-center justify-center min-w-[50vw] min-h-[50vh]">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-[30px] mt-7 animate-fade-in">
              {sortedData.map((doctor) => (
                <DoctorCard key={doctor.id} data={doctor} />
              ))}
            </div>
          )}
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

      {doctorsData && doctorsData?.count < 10 && (
        <section className="flex justify-end mt-[30%]">
          <Image src={backgroundBranch} alt={''} className="absolute -bottom-[16%] -right-[9%] scale-75" />
        </section>
      )}
    </div>
  )
}

export default DoctorsCategory
