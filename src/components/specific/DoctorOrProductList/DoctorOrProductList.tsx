import React from 'react'
import { IShopMedicines } from '@/types'
import { IDoctor } from '@/types/doctor'
import { DoctorCard, ProductCard } from '..'
import { Loader } from '@/components/common'
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

  const itemClasses = clsx('grid gap-[30px] mt-7 animate-fade-in max-xl:gap-x-4 max-sm:mt-2', {
    'grid-cols-3 max-lg:grid-cols-2 max-xs:grid-cols-1': itemType === 'product',
    'grid-cols-4': itemType === 'doctor',
  })

  return loading ? (
    <div className="flex items-center justify-center min-w-[50vw] min-h-[50vh]">
      <Loader />
    </div>
  ) : (
    <div className={itemClasses}>{renderItems()}</div>
  )
}

export default DoctorOrProductList
