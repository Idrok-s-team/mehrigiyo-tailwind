import React from 'react'
import { Breadcrumb } from '@/components/common'
import { FavoriteDoctorsModule } from '@/modules/doctors'
import { ROUTES } from '@/constants'

const FavoriteProducts = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: ROUTES.HOME }, { text: 'Sevimli shifokorlar' }]

  return (
    <div className="relative mt-14 px-10 mb-[70px] mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <Breadcrumb items={breadcrumbItems} />
      <section className="relative">
        <FavoriteDoctorsModule />
      </section>
    </div>
  )
}

export default FavoriteProducts
