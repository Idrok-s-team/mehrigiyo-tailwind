import React from 'react'
import Image from 'next/image'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import { Breadcrumb } from '@/components/common'
import { FavoriteDoctorsModule } from '@/modules/doctors'

const FavoriteProducts = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Sevimli shifokorlar' }]

  return (
    <div className="relative mt-14 px-10 mb-[70px] mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0 overflow-hidden">
      <Breadcrumb items={breadcrumbItems} />
      <section className="relative">
        <FavoriteDoctorsModule />
      </section>
      <Image src={backgroundLeaf} alt={''} className="absolute bottom-0 right-0 -z-10" />
    </div>
  )
}

export default FavoriteProducts
