/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import Image from 'next/image'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { Breadcrumb } from '@/components'
import { CartModule } from '@/modules/cart'

const Faq = async () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Savatcha' }]

  return (
    <div className="px-24 mt-14 mb-[70px]">
      <Breadcrumb items={breadcrumbItems} />
      <CartModule />
      <Image src={backgroundBranch} alt={''} className="absolute mt-[20%] -right-[9%]" />
    </div>
  )
}

export default Faq
