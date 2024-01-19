'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Checkbox, Loader } from '@/components/common'
import { updateFilters } from '@/utils'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import { ResetIcon } from '@/assets/icons'
import { useSyncUrlQueryParams } from '@/hooks/common'
import { IShopTypes, SortCriteriaType } from '@/types'
import { IDoctorTypes } from '@/types/doctor'
import clsx from 'clsx'

interface CategoryFilterProps {
  selectedCategories: string | null
  sortCriteria: SortCriteriaType
  categories?: Array<IDoctorTypes | IShopTypes>
  loading: boolean
  filterType: 'doctor' | 'product'
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  loading,
  selectedCategories,
  sortCriteria,
  filterType,
}) => {
  const [filters, setFilters] = useState<number[]>([])

  useSyncUrlQueryParams('type', filters)
  useSyncUrlQueryParams('sort', sortCriteria)

  useEffect(() => {
    if (selectedCategories?.length) {
      setFilters(selectedCategories.split(',').map(Number))
    }
  }, [selectedCategories])

  const handleClearFilters = useCallback(() => setFilters([]), [])

  const filterClasses = clsx('grid gap-3 animate-fade-in max-2xs:max-h-[140px] max-2xs:overflow-y-auto', {
    'max-md:grid-cols-6 max-sm:grid-cols-4 max-xs:grid-cols-3 max-2xs:grid-cols-2': filterType === 'product',
    'max-md:grid-cols-2 max-2xs:grid-cols-1': filterType === 'doctor',
  })

  return (
    <aside className="relative flex flex-col">
      <h4 className="mt-3">Mahsulotlar</h4>
      <Image src={backgroundLeaf} alt="" priority className="absolute -left-[40%] top-[2%] -z-10" />
      <div className="relative w-[280px] flex flex-col p-5 gap-3 shadow-primary rounded-2xl mt-6 bg-white max-lg:w-[260px] max-md:w-full">
        <div className="flex items-center justify-between">
          <h6 className="text-base">Kategoriyalar</h6>
          <button className="flex items-center gap-[6px] group" onClick={handleClearFilters}>
            <span className="group-hover:rotate-90 duration-200">
              <ResetIcon />
            </span>
            <span className="text-sm text-gray-primary group-hover:underline">Tozalash</span>
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center min-w-[15vw] min-h-[50vh]">
            <Loader />
          </div>
        ) : (
          <div className={filterClasses}>
            {categories?.map(({ id, name }) => (
              <Checkbox
                key={id}
                value={id}
                id={id.toString()}
                checked={filters.includes(id)}
                label={name}
                onChange={({ target: { value, checked } }) => updateFilters(Number(value), checked, setFilters)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default CategoryFilter
