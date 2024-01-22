'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PhoneIcon } from '@/assets/icons'
import { contactData } from '@/constants'
import { Breadcrumb } from '@/components/common'
import backgroundLeaf from '@/assets/images/common/backgroundLeaf.png'
import backgroundBranch from '@/assets/images/common/backgroundBranchRight.png'
import { SendRequestModule } from '@/modules/home'
import locationMap from '@/assets/images/about/locationMap.png'

const Help = () => {
  const [iframeLoading, setIframeLoading] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const handleIframeLoadStart = () => {
    setIframeLoading(true)
    setIframeLoaded(false)
  }

  const handleIframeLoad = () => {
    setIframeLoading(false)
    setIframeLoaded(true)
  }

  const breadcrumbItems = [{ text: 'Bosh sahifa', href: '/' }, { text: 'Yordam' }]

  return (
    <div className="mt-14 mx-auto max-w-[1440px] overflow-hidden">
      <header className="relative flex items-center justify-between gap-32 px-10 mx-auto xl:px-24 max-md:px-4">
        <figure className="flex gap-12">
          <Image
            src={backgroundLeaf}
            alt=""
            priority
            className="-ml-[10%] object-cover w-[225px] h-[305px] max-lg:hidden"
          />

          <figcaption className="mt-12">
            <Breadcrumb items={breadcrumbItems} />
            <h2 className="mt-5">Mehrigiyo sizga yordam beradi</h2>
          </figcaption>
        </figure>

        <Image src={backgroundBranch} alt={''} className="absolute mt-[20%] -right-[9%] max-lg:hidden" />
      </header>

      <section className="px-10 mx-auto xl:px-24 max-md:px-4 lg:-mt-[200px]">
        <SendRequestModule />
      </section>

      <section className="grid grid-cols-2 p-16 px-10 mx-auto mt-52 gap-10 bg-white gap-y-10 rounded-xl shadow-primary xl:px-24 max-xl:p-10 max-xl:mx-16 max-lg:mx-10 max-sm:mx-4  max-sm:p-6 max-sm:grid-cols-1 max-sm:mt-24">
        {contactData.map(({ name, phone, address }) => (
          <div key={name} className="flex flex-col">
            <h5 className="text-[22px] font-medium">{name}</h5>
            <p className="text-lg text-gray-primary max-xs:text-base">{address}</p>
            <Link
              href={`tel:${phone}`}
              className="flex items-center gap-2.5 rounded-lg mt-2.5 text-gray-primary bg-gray-primary/10 py-2 px-5 h-10 md:max-w-[240px] cursor-pointer hover:bg-green-primary/10 group duration-700 max-sm:max-w-[240px]"
            >
              <span>
                <PhoneIcon />
              </span>
              <span className="text-lg font-medium group-hover:text-green-primary max-xs:text-sm">{phone}</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="w-full">
        {iframeLoaded ? (
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24257.508878552435!2d70.988007!3d40.537422!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x603cc83586e778d2!2sMEHRIGIYO!5e0!3m2!1sen!2sus!4v1656483407836!5m2!1sen!2sus"
            width="100%"
            height="564"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy={'no-referrer-when-downgrade'}
          />
        ) : (
          <Image
            src={locationMap}
            alt=""
            className="w-full h-[564px] cursor-pointer object-cover"
            onClick={handleIframeLoad}
          />
        )}
      </section>
    </div>
  )
}

export default Help
