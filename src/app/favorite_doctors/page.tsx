import React from 'react'
import Image from 'next/image'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import { Breadcrumb } from '@/components/common'
import { FavoriteDoctorsModule } from '@/modules/doctors'

const FavoriteProducts = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Sevimli shifokorlar' }]

  return (
    <div className="px-24 mt-14 mb-[30%] relative">
      <Breadcrumb items={breadcrumbItems} />
      <section className="relative">
        <FavoriteDoctorsModule />
      </section>
      <Image src={backgroundLeaf} alt={''} className="absolute bottom-0 right-0 -z-10" />
      <Image src={backgroundBranch} alt={''} className="absolute top-[100%] -right-[10%] -z-10 scale-75" />
    </div>
  )
}

export default FavoriteProducts
