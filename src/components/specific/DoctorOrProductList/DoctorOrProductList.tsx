// ItemList.tsx
import React from 'react'
import { IShopMedicines } from '@/types'
import { IDoctor } from '@/types/doctor'
import { DoctorCard, ProductCard } from '..'
import { Loader } from '@/components/common'

interface ItemListProps {
  loading: boolean
  doctorsData?: IDoctor[]
  productsData?: IShopMedicines[]
  itemType: 'doctor' | 'product'
}

const ItemList: React.FC<ItemListProps> = ({ loading, doctorsData, productsData, itemType }) => {
  const renderItems = () => {
    if (itemType === 'doctor' && doctorsData) {
      return doctorsData.map((doctor) => <DoctorCard key={doctor.id} data={doctor} />)
    } else if (itemType === 'product' && productsData) {
      return productsData.map((product) => <ProductCard key={product.id} data={product} />)
    }
  }

  return loading ? (
    <div className="flex items-center justify-center min-w-[50vw] min-h-[50vh]">
      <Loader />
    </div>
  ) : (
    <div className="grid grid-cols-4 gap-[30px] mt-7 animate-fade-in">{renderItems()}</div>
  )
}

export default ItemList
