import React from 'react'
import { IShopMedicines } from '@/types'
import { IDoctor } from '@/types/doctor'
import { DoctorCard, ProductCard } from '../index'
import { EmptyBox, Loader } from '@/components/common'
import clsx from 'clsx'

interface IProps {
  loading: boolean
  doctorsData?: IDoctor[]
  productsData?: IShopMedicines[]
  itemType: 'doctor' | 'product'
}

const DoctorOrProductList: React.FC<IProps> = ({ loading, doctorsData, productsData, itemType }) => {
  const renderItems = () => {
    if (itemType === 'doctor' && doctorsData) {
      return doctorsData.map((doctor) => <DoctorCard key={doctor.id} data={doctor} />)
    } else if (itemType === 'product' && productsData) {
      return productsData.map((product) => <ProductCard key={product.id} data={product} />)
    }
  }

  const itemClasses = clsx('grid gap-[30px] mt-7 animate-fade-in max-xl:gap-x-4', {
    'grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1 max-sm:mt-2': itemType === 'product',
    'grid-cols-4 max-lg:grid-cols-3 max-xs:grid-cols-2 max-2xs:grid-cols-1': itemType === 'doctor',
  })

  const isEmptyData = itemType === 'doctor' ? !doctorsData?.length : !productsData?.length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-w-[50vw] min-h-[50vh]">
        <Loader />
      </div>
    )
  }

  if (isEmptyData) {
    return <EmptyBox title="Hech narsa topilmadi" withoutButton />
  }

  return <div className={itemClasses}>{renderItems()}</div>
}

export default DoctorOrProductList
