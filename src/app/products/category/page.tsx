'use client'

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb, Pagination } from '@/components/common'
import { CategoryFilter, SortOptions, DoctorOrProductList } from '@/components/specific'
import { useShopMedicinesQuery, useShopTypesQuery } from '@/hooks/queries'
import { SortCriteriaType } from '@/types'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { useSortedData } from '@/hooks/common'
import { ROUTES } from '@/constants'

const ProductsCategory = () => {
  const [sortCriteria, setSortCriteria] = useState<SortCriteriaType>('')
  const [currentPage, setCurrentPage] = useState(1)
  const searchParams = useSearchParams()
  const selectedCategories = searchParams.get('type')

  const { data: shopTypesData, isLoading: isFetchingShopTypes } = useShopTypesQuery()
  const { data: shopMedicinesData, isLoading: isFetchingMedicines } = useShopMedicinesQuery({
    params: { type_ides: selectedCategories as string },
  })

  const sortedData = useSortedData(shopMedicinesData?.results, sortCriteria)

  const breadcrumbItems = useMemo(
    () => [
      { text: 'Bosh sahifa', href: ROUTES.HOME },
      { text: 'Mahsulotlar', href: ROUTES.PRODUCTS },
      { text: 'Barchasi' },
    ],
    [],
  )

  return (
    <div className="relative min-h-screen mt-14 px-10 mx-auto xl:px-24 max-md:px-4 max-w-[1440px] max-sm:mt-5">
      <header>
        <Breadcrumb items={breadcrumbItems} />
      </header>

      <section className="flex gap-[70px] max-xl:gap-5 max-md:flex-wrap">
        <div className="max-md:w-full">
          <CategoryFilter
            categories={shopTypesData?.results}
            loading={isFetchingShopTypes}
            sortCriteria={sortCriteria}
            selectedCategories={selectedCategories}
            filterType="product"
          />
        </div>

        <div className="relative mt-3">
          <SortOptions sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} itemType="product" />
          <DoctorOrProductList productsData={sortedData} itemType="product" loading={isFetchingMedicines} />
        </div>
      </section>

      {shopTypesData && shopTypesData?.count > 10 && (
        <section className="flex justify-end mt-12">
          <Pagination
            currentPage={currentPage}
            pageSize={10}
            totalCount={shopTypesData?.count as number}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      )}

      {shopMedicinesData && shopMedicinesData?.count < 10 && (
        <section className="flex justify-end mt-[30%]">
          <Image src={backgroundBranch} alt={''} className="absolute -bottom-[16%] -right-[9%] scale-75 -z-10" />
        </section>
      )}
    </div>
  )
}

export default ProductsCategory
