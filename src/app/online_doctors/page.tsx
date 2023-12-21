import React from 'react'
import Image from 'next/image'
import { Breadcrumb, SeeAllButton, WatchVideoButton } from '@/components'
import { DoctorListModule, DoctorTypesModule } from '@/modules/doctors'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import doctorHeader from '@/assets/icons/doctor/doctorHeaderIcon.svg'
import { BrandsListModule, HerbsBannerModule, MobileAppModule, UrgentOnlineHelpModule } from '@/modules/home'

const ProductsPage = () => {
  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Onlayn shifokorlar' }]

  return (
    <div className="px-24 mt-14">
      <section className="flex gap-10">
        <div className="flex gap-12">
          <Image src={backgroundLeaf} alt="" priority className="-ml-[10%] object-cover w-[225px] h-[305px]" />

          <div className="mt-10">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Bepul shifokor maslahatini oling</h2>
            <p className="mt-4 text-gray-primary">
              Eng yaxshi shifokorlarimiz, Sizning barcha savolaringizga javob berishadi.
            </p>
            <div className="flex items-center gap-8 mt-8">
              <SeeAllButton text="Bepul maslahat olish" size="md" href="#" />
              <WatchVideoButton />
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Image src={doctorHeader} alt={''} />
        </div>
      </section>

      <section className="mt-24">
        <h4>Shifokor turlari</h4>
        <DoctorTypesModule />
      </section>

      <section className="mt-52">
        <UrgentOnlineHelpModule />
      </section>

      <section className="mt-32">
        <DoctorListModule withFilter={false} />
      </section>

      <section className="mt-52">
        <MobileAppModule />
      </section>

      <section className="mt-40">
        <HerbsBannerModule />
      </section>

      <section className="mt-32">
        <BrandsListModule />
      </section>
    </div>
  )
}

export default ProductsPage
