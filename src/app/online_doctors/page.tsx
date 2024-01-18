import React from 'react'
import Image from 'next/image'
import { Breadcrumb, SeeAllButton, WatchVideoButton } from '@/components/common'
import { DoctorListModule, DoctorTypesModule } from '@/modules/doctors'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import doctorHeader from '@/assets/icons/doctor/doctorHeaderIcon.svg'
import { BrandsListModule, HerbsBannerModule, MobileAppModule, UrgentOnlineHelpModule } from '@/modules/home'

const ProductsPage = () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Onlayn shifokorlar' }]

  return (
    <div className="mt-14 px-10 mx-auto xl:px-24 max-md:px-4 mx max-w-[1440px] max-sm:mt-0">
      <section className="flex justify-between max-sm:flex-wrap">
        <div className="flex gap-12 max-xl:gap-2 max-xl:w-4/5 max-lg:w-full">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[10%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Bepul shifokor maslahatini oling</h2>
            <p className="mt-4 text-gray-primary">
              Eng yaxshi shifokorlarimiz, Sizning barcha savolaringizga javob berishadi.
            </p>
            <WatchVideoButton
              className="mt-10 max-sm:mt-4"
              videoUrl="https://www.youtube.com/embed/CKvdClKdSJo?si=V-Hy0MKf5OdPGZWb"
            />
          </div>
        </div>
        <div className="flex items-center justify-center xl:flex-shrink-0 max-sm:w-full max-sm:mt-4">
          <Image src={doctorHeader} alt={''} />
        </div>
      </section>

      <section className="mt-24 max-sm:mt-18">
        <h4>Shifokor turlari</h4>
        <DoctorTypesModule />
      </section>

      <section className="mt-52 max-sm:mt-24">
        <UrgentOnlineHelpModule />
      </section>

      <section className="mt-32">
        <DoctorListModule withFilter={false} />
      </section>

      <section className="mt-52 max-sm:mt-24">
        <MobileAppModule />
      </section>

      <section className="mt-40 max-sm:mt-32">
        <HerbsBannerModule />
      </section>

      <section className="mt-32 mb-[70px]">
        <BrandsListModule />
      </section>
    </div>
  )
}

export default ProductsPage
